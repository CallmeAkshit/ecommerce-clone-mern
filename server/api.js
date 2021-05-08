const express = require('express');
const router = express.Router();

const users = require('./routes/users');
const sessions = require('./routes/sessions');
const carts = require('./routes/carts');
const products = require('./routes/products');
const orders = require('./routes/orders');


// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/carts', carts);

router.use('/products', products);

router.use('/orders', orders);


module.exports = router;