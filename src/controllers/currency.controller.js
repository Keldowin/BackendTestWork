const CurrencyService = require('../service/currency.service');

const CurrencyController = {
    create: async (req, res) => {
        const { name, ticker } = req.body || {};

        if (!name || !ticker)
            return res.status(400).json({error: "Все поля должны быть заполнены"})

        try {
            const currency = CurrencyService.add(name, ticker);
            return res.status(201).json(currency)
        } catch (err) {
            return res.status(500).json({error: "Ошибка в создании currency"})
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        const currency = CurrencyService.getById(id);

        if (!currency)
            return res.status(404).json({error: "currency не найден"})

        return res.json(currency)
    },

    getAll: async (req, res) => {
        return res.json(CurrencyService.getAll())
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { name, ticker } = req.body || {};

        const currency = CurrencyService.update(id, name, ticker);

        if (!currency)
            return res.status(404).json({error: "currency не найден"})

        return res.json(currency)
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const deleted = CurrencyService.delete(id);

        if (!deleted)
            return res.status(404).json({error: "currency не найден"})

        return res.json(deleted)
    }
}

module.exports = CurrencyController;