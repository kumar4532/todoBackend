import mongoose from "mongoose";
import User from "./user.model.js";

const taskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    dueDate: {
        type: Date
    },
    category: {
        type: String,
        enum: ['work', 'fitness', 'shopping', 'education'],
        default: 'work',
    }
},{timestamps:true})

const Task = mongoose.model("task", taskSchema);

export default Task;