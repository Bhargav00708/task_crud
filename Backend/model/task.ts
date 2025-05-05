import { ITask } from "../type";

const mongoose = require('mongoose');

const taskSchema:ITask = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    dueDate: Number,
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
});

module.exports = mongoose.model('Task', taskSchema);