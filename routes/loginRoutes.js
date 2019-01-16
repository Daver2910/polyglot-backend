const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/usersModel');


router.post('/', (req, res, next) => {

    User.find({email: req.body.email})
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "user successfully found",
                result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "There was an error registering this user",
                error
            })
        })

});

module.exports = router;
