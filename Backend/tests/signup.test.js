const db= require('../config/db');
const app = require('../server')
const request = require('supertest');
const User = require('../models/Users');


beforeAll(async () =>{
    
    console.log(db.connect())
    
    
})
// afterAll(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())



// signUp a user
it('it should create a new user',async()=>{
    
    const res = await request(app)
    .post('/Api/user/signUp').send({
        name:'rohit',
        email:"rohitk1234@navgurukul.org",
        password:"123456789"
    })
    

    expect(res.statusCode).toBe(200)
    
})


// login a user

it('it should login a user',async()=>{
    const res = await request(app)
    .post('/Api/user/login')
    .send({ email:"rohitk705@gmail.com",
            password:"123455678"
        })
    .expect(400)
})


// update/reset passwords

it("Should update password.", async () => {
	const res = await request(app)
		.put(`/Api/users/login/forgotpassword`)
		.send({
            email:"rohit@navgurukul.org",
			password: "password",
			newPassword: "pass1234",
			confirmPassword: "pass1234",
		})
		.expect(res.statusCode).toBe(200)

});

