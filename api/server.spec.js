const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');
const Users = require('../users/users-model');

describe('POST/', () => {
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
            password: "testings"
        })
        expect(res.status).toBe(201)
      
    })
    it('checks for error if missing user info', async () => {
        const res = await request(server).post('/api/auth/register')
        expect(res.status).toBe(500)
    })
})