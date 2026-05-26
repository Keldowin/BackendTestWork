const CurrencyService = require("../service/currency.service");

const PriceController = {
    getBinanceCurrency: async (req, res) => {
        const { currency } = req.params;

        if (!currency)
            return res.status(400).json({error: 'Все поля должны быть заполнены'})

        const findCurrency = CurrencyService.findName(currency)

        if (!findCurrency)
            return res.status(404).json({error: 'Такой currency не найден'})

        const ticker = findCurrency.ticker

        try {
            fetch("https://api.binance.com/api/v3/ticker/price")
                .then(res => res.json())
                .then(currencies => {
                    let filtered = currencies.filter(currency => {
                        const symbol = currency.symbol || '';
                        return symbol.includes(ticker);
                    })

                    return res.json(filtered);
                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: 'Ошибка в price'});
        }
    }
}

module.exports = PriceController;