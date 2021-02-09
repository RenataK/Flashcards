const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'pug');

const mainRoutes = require('./routes'); //default route to index.js
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes); //Route in the URL

app.use( (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

























// app.get('/cards', (req, res) => {
//     res.locals.prompt = 'Who is buried in Grant\'s tomb?';
//     //res.locals.hint = 'Think about whose tomb it is.';
//     res.render('colors');
//     res.render('card');
// });

// app.get('/hello', (req, res) => {
//     res.send('<h1>Hello JS Developer!</h1>');
// });