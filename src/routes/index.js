const express = require('express');
const router = express.Router();

const {StatusController, CurrencyController} = require("../controllers");
const {authenticateToken} = require('../middleware/auth');

// Роут проверки статуса сервера
router.get('/status', StatusController.status)

// Роут проверки JWT
router.get('/auth', authenticateToken, StatusController.auth)

// Роут сущности currency
/**
 * @openapi
 * /currency:
 *   get:
 *     tags:
 *       - Currency
 *     summary: Получить все валюты
 *     description: Возвращает список всех валют в системе
 *     responses:
 *       200:
 *         description: Список валют получен успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: '1'
 *                   name:
 *                     type: string
 *                     example: 'Bitcoin'
 *                   ticker:
 *                     type: string
 *                     example: 'BTC'
 */
router.get('/currency', CurrencyController.getAll)

/**
 * @openapi
 * /currency/{id}:
 *   get:
 *     tags:
 *       - Currency
 *     summary: Получить валюту по ID
 *     description: Возвращает конкретную валюту по её ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID валюты
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Валюта найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 ticker:
 *                   type: string
 *       404:
 *         description: Валюта не найдена
 */
router.get('/currency/:id', CurrencyController.getById)

/**
 * @openapi
 * /currency:
 *   post:
 *     tags:
 *       - Currency
 *     summary: Создать новую валюту
 *     description: Добавляет новую валюту в систему
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ticker
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Bitcoin'
 *               ticker:
 *                 type: string
 *                 example: 'BTC'
 *     responses:
 *       201:
 *         description: Валюта успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 ticker:
 *                   type: string
 *       400:
 *         description: Ошибка валидации - отсутствуют обязательные поля
 */
router.post('/currency', CurrencyController.create)

/**
 * @openapi
 * /currency/{id}:
 *   put:
 *     tags:
 *       - Currency
 *     summary: Обновить валюту
 *     description: Обновляет данные существующей валюты
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID валюты
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Bitcoin Updated'
 *               ticker:
 *                 type: string
 *                 example: 'BTC'
 *     responses:
 *       200:
 *         description: Валюта успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 ticker:
 *                   type: string
 *       404:
 *         description: Валюта не найдена
 */
router.put('/currency/:id', CurrencyController.update)

/**
 * @openapi
 * /currency/{id}:
 *   delete:
 *     tags:
 *       - Currency
 *     summary: Удалить валюту
 *     description: Удаляет валюту из системы
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID валюты
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Валюта успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 ticker:
 *                   type: string
 *       404:
 *         description: Валюта не найдена
 */
router.delete('/currency/:id', CurrencyController.delete)

module.exports = router;