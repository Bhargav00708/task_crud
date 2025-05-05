"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = exports.validationErrors = void 0;
const express_validator_1 = require("express-validator");
exports.validationErrors = [
    (0, express_validator_1.body)("title").notEmpty().isString().withMessage("Title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("status").notEmpty().withMessage("Status is required"),
    (0, express_validator_1.body)("dueDate").isNumeric().withMessage("Due date must be a number"),
];
exports.idValidation = [
    (0, express_validator_1.body)("id").notEmpty().isString().withMessage("Valid id is required"),
];
