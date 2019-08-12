//this file will handle connection logic to the MongoDB database
//npm install mongoose --save
const mongoose=require('mongoose');

mongoose.Promise = global.Promise;

//27017 is the default port that mongodb runs on and then is the name of the database:TaskManager
mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser:true}).then(()=>{
    console.log("Connected to MongoDB successfully");
}).catch((e)=>{
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

module.exports={
    mongoose
};