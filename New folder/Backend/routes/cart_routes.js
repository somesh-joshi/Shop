const express = require('express');
const router = express.Router();
const Cart = require('../models/cart_model.js');

//get all cart
router.get('/', (req, res) => {
    Cart.find({}, (err, cart) => {
        if (err) {
            res.send(err);
        }
        res.json(cart);
    });
});

//update cart quantity
router.put('/:id', (req, res) => {
    Cart.findByIdAndUpdate(req.params.id, req.body, (err, cart) => {
        if (err) {
            res.send(err);
        }
        res.json(cart);
    });
});

//add product to cart
router.post('/add', (req, res) => {
    Cart.create(req.body, (err, cart) => {
        if (err) {
            res.send(err);
        }
        res.json(cart);
    });
});


//export router
module.exports = router;