const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');
const Users = require('../users/users-model');

describe('POST/register', () => {
    // beforeEach(async () => {
    //     await db('users').truncate();
    // })
    // it('add a user', async () => {
    //     let user;
    //     user = await db('users');
    //     expect(user).toHaveLength(0);
    //    await Users.add({
    //        username: Date.now,
    //     password: 'password'
    //     });
    //     user = await db('users');
    //     expect(user).toHaveLength(1);
    //     })
    
    it('Should return 201', async() => {
       
    const res = await request(server).post('/api/auth/register')
        .send({
            username: Date.now(),
            password: "test"
        })
        expect(res.status).toBe(201)
      
    })
    it('checks for error if missing user info', async () => {
        const res = await request(server).post('/api/auth/register')
        expect(res.status).toBe(500)
    })
})

describe('POST/login', () => {
    it('Should return 200', async() => {
       
        const res = await request(server).post('/api/auth/login')
        .send({
            username: "testings",
            password: "testings"
        })
        expect(res.status).toBe(200)
    })
    it('checks for error if missing user info', async () => {
        const res = await request(server).post('/api/auth/login')
        .send({
            username: "testings",
            password: ""
        })
        expect(res.status).toBe(401)
    })
})

describe('GET/ jokes', () => {
    it('get unauthorized status code', async () => {
        const res = await request(server).get('/api/jokes')
        expect(res.status).toBe(400)
    })
    it('get jokes type', async () => {
        const res = await request(server).get('/api/jokes')
        expect(res.type).toMatch('application/json')
    })
})