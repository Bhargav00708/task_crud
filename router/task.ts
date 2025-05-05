import { Request, Response } from "express";
import { checkAuth } from "../middleware/authMiddleware";
import { validationResult } from "express-validator";
import { idValidation, validationErrors } from "../validation/validation";

const router = require("express").Router();
const Task = require("../model/task");

router.post(
  "/create",
  checkAuth,
  validationErrors,
  async (req: Request, res: Response) => {
    const { title, description, status, dueDate } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const task = new Task({ title, description, status, dueDate });
      await task.save();
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(201).json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get(
  "/:id",
  checkAuth,
  idValidation,
  async (req: Request, res: Response) => {
    try {
      const task = await Task.findById(req.params.id);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.put(
  "/:id",
  checkAuth,
  idValidation,
  async (req: Request, res: Response) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(201).json(updatedTask);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete(
  "/:id",
  checkAuth,
  idValidation,
  async (req: Request, res: Response) => {
    try {
      const { role } = req.body;
      if (role !== "admin") {
        throw new Error("You are not authorized to delete this task");
      }
      await Task.deleteOne({ _id: req.params.id });
      res.status(201).json({
        message: "Task deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
