/*
    Author: Wei Cao
    Desc: use this file to combine all of the models,so it is easier to import them from other files
    Date: 4/14/2019
*/

const {List}=require('./list.model');
const {Task}=require('./task.model');

module.exports={
    List,
    Task
}