const express = require('express');
const { httpNewOrder } = require('../controllers/orderNewController');


const router = express.Router();

router.get("/order/new",httpNewOrder)



module.exports = router;