const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
},{timestamps:true});

module.exports = mongoose.model("project",projectSchema);