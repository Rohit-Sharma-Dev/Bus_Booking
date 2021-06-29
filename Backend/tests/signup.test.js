const request = require('supertest')
const server = require('../server')
const User = require('../models/Users')
const DB = require('../config/db')
console.log(DB.connect())


beforeAll(async () => await DB.connect())
afterAll(async () => await DB.clearDatabase())
afterAll(async () => await DB.closeDatabase())


it("Should signup new user correctly", async () => {
    const res = await request(server)
        .post('/Api/signUp')
        .send({
            name: "kritika",
            email: "kritika@gmail.com",
            password: "12345678",
            isAdmin: false
        })
    expect(res.statusCode).toBe(200)
    console.log(err.statusCode)
})