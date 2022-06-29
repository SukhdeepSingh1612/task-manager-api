const nodemailer = require('nodemailer');
//jest.mock('nodemailer');
jest.setTimeout(100000)
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user')
const {userOneId,userOne,setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)


test('should signup a new user', async()=>{
    const response = await request(app).post('/users').send({
        name:  'Sukhdeep3',
        email: 'sukhdeep247@example.com',
        password: 'MyPass777!'
    }).expect(201)

    //Assert that database was chnaged correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assertion about the response
    expect(response.body).toMatchObject({
        user:{
            name:'Sukhdeep3',
            email: 'sukhdeep247@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})



test('should log in existing user', async()=>{
   const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //Assert new token is saved
    const user = await User.findById(userOneId);

    expect(response.body.token)
        .toBe(user.tokens[1].token)
})

test('should not login non-existent user',async ()=>{
    await request(app).post('/users/login').send({
        email: 'sukh1234@example.com',
        password: '123wsdj2'
    }).expect(400)
})

test('should get profile for user',async()=>{
    await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test('should not get profile for unauthorised users',async()=>{
    await request(app)
            .get('/users/me')
            .send()
            .expect(401)
})

test('should delete account for user', async()=>{
    await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)


    //Assert that user gets deleted from the database
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
})

test('should not delete user for unauthorised users',async()=>{
    await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}123`)
            .send()
            .expect(401)
})


test('Should upload avatar image', async()=>{
    await request(app)
                .post('/users/me/avatar')
                .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
                .attach('avatar','/Users/sukhdeepnarulasingh/UniversityWork/UBC VAN/Node.js Udemy/task-manager/tests/fixtures/avatar.jpeg')
                .expect(200)
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
    
    
})


test('Should update valid user fields', async()=>{
    const response = await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Max Verstappen'
    })
    .expect(200)
})

test('Should not update non existent paramters', async()=>{
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                    location: 'Delhi'
                })
            .expect(400)
})


//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated