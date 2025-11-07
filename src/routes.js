const express = require('express');
const { add, subtract, multiply, divide } = require('./mathController');

const router = express.Router();

router.post('/add', add);
router.post('/subtract', subtract);
router.post('/multiply', multiply);
router.post('/divide', divide);

module.exports = router;