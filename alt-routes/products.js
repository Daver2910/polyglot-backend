const express = require('express');
const Router = express.Router();
const Product = require('../models/products');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest:'upload/'});

Router.get('/', (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                "message": "products are found here.",
                result
            });
        })
        .catch(err => {
            res.status(300).json({
                "message": "there was an error processing your requests",
                "error": err
            })
        })
});

Router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(result => {
            res.status(201).json({
                "message": "products are updated here.",
                result
            })
        })
        .catch(err => {
            res.status(300).json({
                "message": "there was a problem submitting the product",
                "error": err
            })
        })
});

Router.get('/:productId', (req, res, next) => {
    Product.findOne({_id:req.params.productId})
        .then(result => {
            if (result != null) {
                res.status(200).json({
                    result
                })
            } else {
                res.status(200).json({
                "message": "we could not find your request"
                })
            }
        })
        .catch(err => {
            res.status(300).json({
                "message": "there was an error while looking for your request",
                "error": err
            })
        })
});

Router.delete('/:productId', (req, res, next) => {
    Product.findOne({_id:req.params.productId})
        .remove()
        .exec()
        .then(result => {
            if (result != null) {
                res.status(200).json({
                    result
                })
            } else {
                res.status(200).json({
                    "message": "we could not find your request"
                })
            }
        })
        .catch(err => {
            res.status(300).json({
                "message": "there was an error while looking for your request",
                "error": err
            })
        })
});

Router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    req.body.map(ops => {
        updateOps[ops.prop] = ops.value;
    });

    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                result,
                "arr": req.body,
                "message": "we have updated your record"
            })
        })
        .catch(err => {
            res.status(300).json({
                "message": "there was an error while looking for your request",
                "error": err
            })
        })
});

module.exports = Router;
