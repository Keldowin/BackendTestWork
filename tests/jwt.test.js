const app = require("../src/app");
const request = require('supertest')

describe('GET /auth with token', () => {
    it("Должен прийти ответ от сервера ok", async() => {
        const res = await request(app)
            .get('/auth')
            .set('Authorization', `Bearer ${process.env.TEST_HASH}`)
            .expect(200);

        expect(res.body.status).toBe('ok');
    })
})


describe('GET /auth without token', () => {
    it("Должен прийти ответ что пользователь не авторизован", async() => {
        const res = await request(app)
            .get('/auth')
            .expect(401);
    })
})