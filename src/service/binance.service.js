const BINANCE_URL = 'https://api.binance.com/api/v3/ticker/price';
const TIMEOUT = 5000;

const BinanceService = {
    getPricesByTicker: async (ticker) => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), TIMEOUT);

            // Получение ответа от внешнего API
            const response = await fetch(BINANCE_URL, { signal: controller.signal });
            clearTimeout(timeout);

            if (!response.ok) throw new Error('Binance API error');

            const data = await response.json();

            // Бизнес логика
            return data.filter(item => item.symbol.includes(ticker.toUpperCase()));

        } catch (error) {
            console.error('Binance error:', error);
            // Graceful degradation
            return null;
        }
    }
};

module.exports = BinanceService;