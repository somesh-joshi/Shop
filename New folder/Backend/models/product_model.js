const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({  
    name: {     
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: "Not Available"
    },
    image: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model('Product', productSchema);

//export the model
module.exports = Product;