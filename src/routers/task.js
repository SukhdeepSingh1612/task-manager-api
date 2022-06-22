const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');
const { rawListeners } = require('../models/task');



// GET /tasks?complete:true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth,  async (req,res)=>{
    const match = {}
    const sort = {}

    if(req.query.complete){
        match.complete = req.query.complete === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1;
    }



    try{
        await req.user.populate([{path: 'tasks',
    match, options: {
        limit : parseInt(req.query.limit),
        skip : parseInt(req.query.skip),
        sort
    }
    }]);
        res.send(req.user.tasks);
    }catch(e){
        res.status(500).send(e);
    }
    
})

router.get('/tasks/:id', auth, async (req,res)=>{
    _id = req.params.id;
    
    if(ObjectId.isValid(_id)){
        try{
            const task= await Task.findOne({_id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
        }catch(e){
            res.status(500).send(e);
        }
        

    } else{
        res.status(400).send('Invalid id string');
    }
    
})


router.post('/tasks',auth, async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch('/tasks/:id',auth, async (req,res) =>{
    

    const updates = Object.keys(req.body);
    const allowedUpdates =['description', 'complete'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); 

    if(!isValidOperation){
        return res.status(400).send('Invalid Updates')
    }

    try{
        
        
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update)=> task[update] = req.body[update]);
        await task.save();

        
        res.send(task);
    }catch(err){
        console.log()
        res.status(500).send(err);
    }
})

router.delete('/tasks/:id',auth, async(req,res) =>{
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send('Not found!');
        }
        res.send('Task deleted');
    
    }catch(e){
        res.status(500).send(e)
    }

})





module.exports = router;
