"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_validator_1 = require("express-validator");
const validation_1 = require("../validation/validation");
const router = require("express").Router();
const Task = require("../model/task");
router.post("/create", authMiddleware_1.checkAuth, validation_1.validationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, dueDate } = req.body;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const task = new Task({ title, description, status, dueDate });
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get("/", authMiddleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.find();
        res.status(201).json(tasks);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get("/:id", authMiddleware_1.checkAuth, validation_1.idValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task.findById(req.params.id);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.put("/:id", authMiddleware_1.checkAuth, validation_1.idValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(201).json(updatedTask);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.delete("/:id", authMiddleware_1.checkAuth, validation_1.idValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        if (role !== "admin") {
            throw new Error("You are not authorized to delete this task");
        }
        yield Task.deleteOne({ _id: req.params.id });
        res.status(201).json({
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
module.exports = router;
