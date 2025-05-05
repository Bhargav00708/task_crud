"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
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
