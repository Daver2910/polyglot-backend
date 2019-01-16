const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');


router.post('/', (req, res, next) => {

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) throw err;
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                surname: req.body.surname,
                email: req.body.email,
                phone: req.body.phone,
                password: hash
            });
            user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "new user successfully created",
                        user
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: "There was an error registering this user",
                        error
                    })
                })
        })
});

module.exports = router;
