/*
    Author: Wei Cao
    Desc: make model(List) for mongoose
    Date:4/14/2019
*/
const mongoose=require('mongoose');
//create a schema
const ListSchema=new mongoose.Schema({
    //define the fields that this schema would have
    title:{
        type:String,
        required:true,
        minlength:1,
        //whitespace at both ends of the string are trimmed away
        trim:true
    }
})

//create the model;the first params is the name of the model 
const List = mongoose.model('List',ListSchema);

module.exports={List}
