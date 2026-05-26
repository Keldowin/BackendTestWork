const app = require("../src/app");
const request = require('supertest')

describe('GET /status', () => {
    it("Должен прийти ответ от сервера ok", async() => {
        const res = await request(app)
            .get('/status')
            .expect(200);

        expect(res.body.status).toBe('ok');
    })
})
