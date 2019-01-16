const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db.js');
const morgan = require('morgan');
const RegisterUserRoutes = require('./routes/registerUserRoutes');
const LoginRoutes = require('./routes/loginRoutes');
const app = Express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header("Access-Control-Allow-Headers",
       'Accept, Authorization, Content-Type, Origin, X-Requested-With');
   if (req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
       res.status(200).json({});
   }
   next();
});

app.use('/register', RegisterUserRoutes);
app.use("/login", LoginRoutes);

mongoose.connect(db.url);

module.exports = app;
