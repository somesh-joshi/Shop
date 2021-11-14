const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  CartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
});


const Cart = mongoose.model('Cart', CartSchema);

//export the model
module.exports = Cart;

