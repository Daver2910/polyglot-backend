const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: Number,
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);
