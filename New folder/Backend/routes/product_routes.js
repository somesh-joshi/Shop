const express = require('express');
const router = express.Router();
const Product = require('../models/product_model.js');


//add product
router.post('/add', (req, res) => {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': product});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});


//get all products
router.get('/', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Products: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//get product by id
router.get('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Product: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//exporting router  
module.exports = router;



