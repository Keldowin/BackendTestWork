const CurrencyService = require("../service/currency.service");
const BinanceService = require("../service/binance.service");

const PriceController = {
    getBinanceCurrency: async (req, res) => {
        const { currency } = req.params;

        if (!currency)
            return res.status(400).json({ error: 'Currency не передан' });

        const findCurrency = CurrencyService.findName(currency);
        if (!findCurrency)
            return res.status(404).json({ error: 'Currency не найден' });

        const prices = await BinanceService.getPricesByTicker(findCurrency.ticker);

        if (!prices)
            return res.status(503).json({ error: 'Binance недоступен' });

        return res.json({
            currency: findCurrency.name,
            count: prices.length,
            ticker: findCurrency.ticker,
            pairs: prices,
        });
    }
};

module.exports = PriceController;