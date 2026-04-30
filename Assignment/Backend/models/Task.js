const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    status:{
        type:String,
        enum:["Todo","In Progress","Done"],
        default:"Todo"
    },
    deadline:{
        type:Date
    }
},{timestamps:true});

module.exports = mongoose.model("task",taskSchema);