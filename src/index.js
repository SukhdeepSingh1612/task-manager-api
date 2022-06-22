//  require('dotenv').config();
const express = require('express');
require('./db/mongoose');
const mongoose = require('mongoose');
const { response } = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');


const app = express();
const port = process.env.PORT;

app.use(express.json());
ObjectId = mongoose.Types.ObjectId;
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log('Server is up on ' + port);
})

const task = require('./models/task');
const Task = require('./models/task');
const User = require('./models/user');



