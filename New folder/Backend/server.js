const express = require('express');
const mongoose = require('mongoose');

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/test');
//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});
//on error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());

app.use('/productapi',require('./routes/product_routes.js'));
app.use('/cartapi',require('./routes/cart_routes.js'));

// error handling middleware
app.use((err, req, res, next) => {
    //console.log(err);
    res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(4000, () => {
    console.log('Server is running on 4000');
});