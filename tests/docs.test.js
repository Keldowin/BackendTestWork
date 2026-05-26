const request = require('supertest');
const app = require('../src/app');

describe('GET /docs', () => {
    it("Должен вернуть документацию к api", async () => {
        const res = await request(app)
            .get('/docs/')
            .expect(200);
    });
});
