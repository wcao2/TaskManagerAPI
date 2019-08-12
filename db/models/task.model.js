/*
    Author: Wei Cao
    Desc: make model(Task) for mongoose
    Date:4/14/2019
*/
const mongoose=require('mongoose');
//create a schema
const TaskSchema=new mongoose.Schema({
    //define the fields that this schema would have
    title:{
        type:String,
        required:true,
        minlength:1,
        //whitespace at both ends of the string are trimmed away
        trim:true
    },
    //which list this task belongs to
    _listId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    //add a field here
    completed:{
        type:Boolean,
        default:false
    }
})

//
const Task = mongoose.model('Task',TaskSchema);

module.exports={Task}
