const express = require('express');
const Router = express.Router();

Router.get('/', (req, res, next) => {
    res.status(200).json({
        "message": "you got some orders"
    });
});

Router.post('/', (req, res, next) => {
    res.status(200).json({
        "message": "you posted an orders"
    });
});

Router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 1) {
        res.status(200).json({
            "message": "you found the correct order",
            id
        })
    } else {
        res.status(200).json({"message": "you looking for an orders"});
    }
});

Router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        "message": "you deleted the order",
        id
    })
});


Router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        "message": "you patched the order",
        id
    })
});

module.exports = Router;
