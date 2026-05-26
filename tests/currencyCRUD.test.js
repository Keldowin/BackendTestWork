const request = require('supertest');
const app = require('../src/app');
const CurrencyService = require('../src/service/currency.service');

// Тестирование GET запросов к currency
describe('GET /currency', () => {
    beforeEach(() => {
        // Очищаем БД перед каждым тестом
        CurrencyService.clear();
    });

    it("Должен прийти пустой список", async () => {
        const res = await request(app)
            .get('/currency')
            .expect(200);

        expect(res.body.length).toBe(0);
    });

    it("Должен прийти список с 1 элементом", async () => {
        // Добавляем тестовые данные
        CurrencyService.add('Bitcoin', 'BTC');
        const res = await request(app)
            .get('/currency')
            .expect(200);

        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('Bitcoin');
    });

    it("Должен прийти элемент под id 2", async () => {
        // Добавляем тестовые данные
        CurrencyService.add('Bitcoin', 'BTC');
        CurrencyService.add('TestValue', 'TEV');
        const res = await request(app)
            .get('/currency/2')
            .expect(200);

        expect(res.body.name).toBe('TestValue');
    });
});

// Тестирование post метода
describe('POST /currency', () => {
    beforeEach(() => {
        // Очищаем БД перед каждым тестом
        CurrencyService.clear();
    });

    it("Должен добавиться новый элемент", async () => {
        await request(app)
            .post('/currency')
            .type('form')
            .send({
                name: 'Bitcoin',
                ticker: 'BTC'
            })
            .expect(201);
    });
});

// Тестирование update метода
describe('PUT /currency', () => {
    beforeEach(() => {
        // Очищаем БД перед каждым тестом
        CurrencyService.clear();
    });

    const newTicker = 'KIT';
    const newName = 'Kitcoin'

    it("Должен обновиться параметр ticker в полученном элементе", async () => {
        CurrencyService.add('Bitcoin', 'BTC');

        const res = await request(app)
            .put('/currency/1')
            .type('form')
            .send({
                ticker: newTicker,
            })
            .expect(200);

        expect(res.body.ticker).toBe(newTicker);
    });

    it("Должен обновиться параметр name, ticker в полученном элементе", async () => {
        CurrencyService.add('Bitcoin', 'BTC');

        const res = await request(app)
            .put('/currency/1')
            .type('form')
            .send({
                name: newName,
                ticker: newTicker,
            })
            .expect(200);

        expect(res.body.ticker).toBe(newTicker);
        expect(res.body.name).toBe(newName);
    });

    it("Элемент должен не измениться", async () => {
        const currency = CurrencyService.add('Bitcoin', 'BTC');

        const res = await request(app)
            .put('/currency/1')
            .expect(200);

        expect(res.body).toStrictEqual(currency);
    });
})

// Тестирование метода delete
describe('DELETE /currency', () => {
    beforeEach(() => {
        // Очищаем БД перед каждым тестом
        CurrencyService.clear();
    });

    it("Элемент должен удалиться", async () => {
        CurrencyService.add('Bitcoin', 'BTC');

        await request(app)
            .delete('/currency/1')
            .expect(200);

        await request(app)
            .get('/currency/1')
            .expect(404);
    })
})