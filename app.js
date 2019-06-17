const express = require('express'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    es6renderer = require('express-es6-template-engine'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');

const indexRouter = require('./routes/index-route'),
    usersRouter = require('./routes/users-route'),
    surveyRouter = require('./routes/survey-route');

const app = express();

app.set('views', './views');
app.engine('html', es6renderer);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new FileStore(),
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey', surveyRouter);


module.exports = app;
