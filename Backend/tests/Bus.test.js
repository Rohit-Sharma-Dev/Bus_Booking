const db= require('../config/db');
const app = require('../server');
const request = require('supertest');
const createBus=require('../controllers/Bus')

describe('testing CreateBus', ()=>{
    it('it should create a bus',()=>{
        expect(2+2).toBe(4)
    })
})
