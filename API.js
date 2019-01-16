const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./config/db.js');
const mongoose = require('mongoose');

mongoose.connect(db.url);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cache-Control", "no-cache,no-store");
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, PATCH, GET, DELETE, POST")
        res.status(200).json({});
    }
    next();
});

//get and post reqs
const productRoutes = require('./alt-routes/products');
const orderRoutes = require('./alt-routes/orders');

app.use('/products', productRoutes);
app.use('/orders',orderRoutes);

app.use((req, res, next) => {
    const myErrorObj = new Error('not found');
    myErrorObj.status = 404;
    next(myErrorObj);
});

app.use((myErrorObj, req, res, next) => {
    res.status(myErrorObj.status || 500);
    res.json({
        error: {
            message: myErrorObj.message
        }
    })
})
module.exports = app;
