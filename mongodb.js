//CRUD create read update delete

const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const {MongoClient, ObjectID }  = require('mongodb');
const connectionURL = 'mongodb+srv://admin:admin@cluster0.j0s3x.mongodb.net';
const databaseName = 'task-manager';
// const id = new ObjectID()
// console.log(id);
// console.log(id.toHexString().length);
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) =>{
    if(error){
            return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // db.collection('users').findOne({_id: new ObjectID('62a86195c9e6ced3b3e2cef0')},(error,user) =>{
    //     if(error){
    //         return console.log('error');
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({age: 28}).count((error,users)=>{
    //     console.log(users);
    // })

    // db.collection('Tasks').findOne({_id: new ObjectID('62a86371ca103d33b0be2aca')},(error,task)=>{
    //     console.log(task)
    // })

    // db.collection('Tasks').find({complete: false}).toArray((error,tasks)=>{
    //     console.log(tasks)
    // })
    // db.collection('users').updateOne({_id: new ObjectID('62a86195c9e6ced3b3e2ceef')},{
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) =>{
    //     console.log(result);
    // }).catch((error) =>{
    //     console.log(error);
    // })

    // db.collection('Tasks').updateMany({
    //     complete: false},{
    //         $set: {
    //             complete: true
    //         }

    //     }).then((result) =>{
    //     console.log(result.modifiedCount);
    // }).catch((error) =>{
    //     console.log(error);
    // })

    // db.collection('users').deleteMany({age : 29}).then((result) =>{
    //     console.log(result);
    // }).catch((error) =>{
    //     console.log(error);
    // })

    db.collection('Tasks').deleteOne({description: 'get groceries!'}).then((result) =>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })

    db.collection('Tasks').insertMany([{
        description: 'groceries!',
        complete: false
    },{
        description: 'groceries!',
        complete: false
    }]).then((result)=>{
        console.log(result);
    }).catch((error) =>{
        console.log(error);
    })


    


})


