const mongoose = require("mongoose");

const task_schema = mongoose.Schema(
    {
        name: 
        {
            type: String,
            required : [true, "Please add a valid name"]
        },

        completed:
        {
            type: Boolean,
            required: true,
            default: false
        }
    },
    
    {
        timestamps: true
    }
);

const Task_model = mongoose.model("Task", task_schema);

module.exports = Task_model;