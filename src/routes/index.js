const express = require('express');
const router = express.Router();

const {StatusController} = require("../controllers");
const {authenticateToken} = require('../middleware/auth');

// Роут проверки статуса сервера
router.get('/status', StatusController.status)

// Роут проверки JWT
router.get('/auth', authenticateToken, StatusController.auth)

module.exports = router;