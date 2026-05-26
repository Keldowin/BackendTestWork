const request = require('supertest');
const app = require('../src/app');
const CurrencyService = require('../src/service/currency.service');

describe('GET /price/:currency', () => {
    beforeEach(() => {
        CurrencyService.clear();
    });

    it("Должен вернуть 404 если маршрут не найден", async () => {
        const res = await request(app)
            .get('/price')
            .expect(404);
    });

    it("Должен вернуть 404 если currency не найден в БД", async () => {
        const res = await request(app)
            .get('/price/NOTEXIST')
            .expect(404);

        expect(res.body.error).toBe('Currency не найден');
    });

    it("Должен вернуть 503 если Binance недоступен", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({})
            })
        );

        CurrencyService.add('Bitcoin', 'BTC');

        const res = await request(app)
            .get('/price/Bitcoin')
            .expect(503);

        expect(res.body.error).toBe('Binance недоступен');
    });

    it("Должен вернуть пары от Binance если всё ОК", async () => {
        // Мокируем fetch перед запросом
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { symbol: 'BTCUSDT', price: '45000' },
                    { symbol: 'ETHBTC', price: '0.025' },
                    { symbol: 'BNBBTC', price: '0.0055' }
                ])
            })
        );

        CurrencyService.add('Bitcoin', 'BTC');

        const res = await request(app)
            .get('/price/Bitcoin')
            .expect(200);

        expect(res.body.currency).toBe('Bitcoin');
        expect(res.body.ticker).toBe('BTC');
        expect(res.body.pairs).toHaveLength(3);
        expect(res.body.count).toBe(3);
    });

    it("Должен вернуть пустой массив если нет пар", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { symbol: 'ETHUSDT', price: '2500' },
                    { symbol: 'BNBUSDT', price: '600' }
                ])
            })
        );

        CurrencyService.add('Bitcoin', 'BTC');

        const res = await request(app)
            .get('/price/Bitcoin')
            .expect(200);

        expect(res.body.pairs).toEqual([]);
        expect(res.body.count).toBe(0);
    });

    it("Должен обработать ошибку Binance API", async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Network error'))
        );

        CurrencyService.add('Bitcoin', 'BTC');

        const res = await request(app)
            .get('/price/Bitcoin')
            .expect(503);

        expect(res.body.error).toBe('Binance недоступен');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});