import { body } from "express-validator";

export const validationErrors = [
  body("title").notEmpty().isString().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("status").notEmpty().withMessage("Status is required"),
  body("dueDate").isNumeric().withMessage("Due date must be a number"),
];

export const idValidation = [
  body("id").notEmpty().isString().withMessage("Valid id is required"),
];
