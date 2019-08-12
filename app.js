/*
    Author: Wei Cao
*/
const express=require('express');
const app=express();
//when lunch the app, it's able to connect to the MongoDB database
const {mongoose} =require('./db/mongoose');

const bodyParser=require('body-parser');


//Load in the Mongoose model because of index.js do not need it seperate
//const {List}=require('./db/models/list.model');
//const {Task}=require('./db/models/task.model');
const {List, Task}= require('./db/models');

/*
    Desc: load middleware, middleware will pass the request body of the HTTP request
 */
app.use(bodyParser.json());

//CORS headers middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    next();
});

//Route handlers

/*
    Desc: List routes,GET   /lists,
    purpose: get all lists
    Time: 4/12/2019
*/
app.get('/lists',(req,res)=>{
    //return an array of all the lists in the database,so {}
    List.find({}).then((lists)=>{
        res.send(lists);
    });
});

/*
    Desc: List routes,POST   /lists, 
    purpose:Create a list
*/
app.post('/lists',(req,res)=>{
    //create new List and return the new list document back to the user includes the id
    //The list info will be passed in via the JSON request body
    //npm install body-parser --save
    //the middleware(bodyparser)  will parse the request body of the HTTP request
    //now do things like request.body.title to get title that was passed
    let title= req.body.title;
    //create a new list
    let newList =new List({
        // put an object with the fields
        title
    });
    newList.save().then((listDoc)=>{
        // the full list document is returned
        res.send(listDoc);
    })
});
/*
    Desc:/lists/:id; 
    purpose:Update a specified list
*/
app.patch('/lists/:id',(req,res)=>{
    //update the specified list(list document with id in URL)
    List.findOneAndUpdate({_id:req.params.id},{
        $set:req.body//$set is mongodb key word
    }).then(()=>{
        //do not need to send back updated document 
        res.sendStatus(200);
    });
});

/*
    Desc:/lists/:id; 
    purpose:Delete a specified list
*/
app.delete('/lists/:id',(req,res)=>{
    //delete the specified list(list document with id in URL)
    List.findByIdAndRemove({
        _id:req.params.id
    }).then((removedListDoc)=>{
        res.send(removedListDoc);
    })
})


/**
   desc: create the route for the tasks
   author: Wei Cao
   data:4/14/2019
 */
app.get('/lists/:listId/tasks',(req,res)=>{
   //want to return all tasks that belong to a specific list(specified by listId)
   Task.find({
       _listId:req.params.listId
   }).then((tasks)=>{
       res.send(tasks);
   })
});

//post/lists/:listId/tasks
app.post('/lists/:listId/tasks',(req,res)=>{
    //create a new task in a list specified by listId
    let newTask= new Task({
           title:req.body.title,
           _listId:req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
});

/*
    PATCH /lists/:listId/tasks/:taskId
    purpose:update an existing task
*/
app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    //update the existing tasks specified by taskId
    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.listId
    },{
        $set:req.body
      }
    ).then(()=>{
        res.send({message: 'Updated successfully'})
    })
});

/**
  DELETE /lists/:listId/tasks/:taskId
  purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndRemove({
        _id:req.params.taskId,
        _listId:req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
});

/*
    want to have a route that provide taskId and listId would return task with that taskId in that list
    get the document just one item
*/
app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({
        _id:req.params.taskId,
        _listId:req.params.listId
    }).then((task)=>{
        res.send(task);
    })
})


app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})