const express = require('express');
const router = express.Router();

const stockController =
    require('../controllers/stockController');

router.post('/in', stockController.stockIn);

module.exports = router;