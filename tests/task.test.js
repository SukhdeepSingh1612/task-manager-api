const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const { userOneId,
        userOne,
        setupDatabase,
        userTwo,
        userTwoId,
        taskOne,
        taskThree,
        taskTwo} = require('./fixtures/db');

const { response } = require('../src/app');

beforeEach(setupDatabase)

test('Should create task for user', async()=>{
    const response = await request(app)
                            .post('/tasks')
                            .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
                            .send({
                                description: 'from my test'
                            })
                            .expect(201)
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();   
    expect(task.complete).toBe(false)                     
})

test('Should return only the users task', async()=>{
    const response = await request(app)
                            .get('/tasks')
                            .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
                            .send()
                            .expect(200)     
    expect(response.body.length).toBe(2);                  
            
})

test('Should maintain task delete security', async()=>{
    const response = await request(app)
            .delete(`/tasks/${taskOne._id}`)
            .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
            .expect(404)
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull()        
})


//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks