const express = require('express');
const { pushDatatoGraphDB } = require('../controllers/util.controller');
const router = express.Router();

router.post('/pushDatatoGraphDB', pushDatatoGraphDB);

module.exports = router;
