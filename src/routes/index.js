const express = require('express');
const router = express.Router();

const {StatusController, CurrencyController} = require("../controllers");
const {authenticateToken} = require('../middleware/auth');

// Роут проверки статуса сервера
router.get('/status', StatusController.status)

// Роут проверки JWT
router.get('/auth', authenticateToken, StatusController.auth)

// Роут сущности currency
router.get('/currency', CurrencyController.getAll)
router.get('/currency/:id', CurrencyController.getById)
router.post('/currency', CurrencyController.create)
router.put('/currency/:id', CurrencyController.update)
router.delete('/currency/:id', CurrencyController.delete)

module.exports = router;