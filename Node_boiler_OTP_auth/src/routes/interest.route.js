const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const { getAllInterests } = require('../controllers/interest.controller');
const router = express.Router();

router.get('/getAllInterests', checkAuth, getAllInterests);

module.exports = router;