const {createAgency}=require('../controllers/Agency')
const db= require('../config/db');
const app = require('../server');
const request = require('supertest');

const mockResponse=()=>{
    const res={}
    res.status=jest.fn().mockReturnValue(res)
    res.json=jest.fn().mockReturnValue(res)
    return res
}

beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());


describe("it should add Agency",()=>{
    it("it should add Agency",async()=>{
        const res=mockResponse()
        let req = {
            body:{
            phone:9876543210,
            agencyName:"Ram dalal",
            headOfficeLocation:"New Delhi"
            },
            user:'60e8598ce58ae2d6b57e8e76' }
            
            await createAgency(req,res)
            expect(res.status).toHaveBeenCalledWith(200)
            console.log(res.json.mock.calls[0], "dfghjklwihjoiuwhquiohuq")
            expect(res.json).toHaveBeenCalled()
    })

  
})
