const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });

    if (process.env.TEST_HASH === token)
        next() // Для теста просто проверяем значение из .env
}

module.exports = {authenticateToken};