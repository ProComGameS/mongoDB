const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient, ObjectId } = require('mongodb');

const dbUser = process.env.DB_USER;
const dbPasspord = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://${dbUser}:${dbPasspord}@test.xm463mn.mongodb.net/?retryWrites=true&w=majority&appName=Test`;

let db;
let usersCollection;

const client = new MongoClient(connectionString);

client.connect()
    .then(() => {
        db = client.db('Test');
        usersCollection = db.collection('users');
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await usersCollection.findOne({ email });
            if (!user) return done(null, false, { message: 'Користувача не знайдено' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Неправильний пароль' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ email, password: hashedPassword });
    res.json({ message: 'Реєстрація успішна' });
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message });

        req.login(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Авторизація успішна', user });
        });
    })(req, res, next);
});

app.post('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Вихід успішний' });
    });
});

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Неавторизовано' });
}

app.get('/protected', ensureAuth, (req, res) => {
    res.json({ message: `Вітаю ${req.user.email}, ти у захищеній зоні 🚀` });
});

app.get('/set-theme/:theme', (req, res) => {
    const theme = req.params.theme;
    res.cookie('theme', theme);
    res.redirect('/');
});

app.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light';
    next();
});

app.get('/toggle-theme', (req, res) => {
    const current = req.cookies.theme || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    res.cookie('theme', next, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect('articles');
});

app.get('/set-name/:name', (req, res) => {
    req.session.username = req.params.name;
    res.send(`Імʼя збережено: ${req.session.username}`);
});

app.get('/get-name', (req, res) => {
    res.send(`Вітаю ${req.session.username} вдома`);
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

const articles = [
    { id: 1, title: '30 найкращих країн, міст і локацій для туристів у 2025 році', content: 'Отож, експерти з подорожей радять відвідати у 2025 році наступні країни:\n\nКамерун;\nЛитва;\nФіджі;\nЛаос;\n-;\nПарагвай;\nТринідад і Тобаго;\nВануату;\nСловаччина;\n-.' },
    { id: 2, title: 'DIE SCHÖNSTEN URLAUBSZIELE IM ÜBERBLICK', content: 'TÜRKEI ÄGYPTEN KROATIEN THAILAND SPANIEN ITALIEN.' },
];

app.get('/articles', (req, res) => {
    res.render('articles', {
        articles,
        username: req.session.username || null,
    });
});

app.get('/articles/:articleid', (req, res) => {
    const article = articles.find(obj => obj.id === parseInt(req.params.articleid));
    if (!article) {
        return res.status(404).send('Не знайдено');
    } else {
        res.render('article', { article: article });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
