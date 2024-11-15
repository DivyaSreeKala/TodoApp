
const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    description:String,
    status:String
})

const todoModel = mongoose.model('todo', Schema);

module.exports = todoModel;
