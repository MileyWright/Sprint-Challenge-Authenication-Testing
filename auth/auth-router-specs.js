const request = require('supertest');
const authRouter = require('./auth-router');

describe('POST/', () => {
    it('it\'s registering users correctly', () => {
        return request(authRouter).post('/register')
        .expect(201)
    })
})