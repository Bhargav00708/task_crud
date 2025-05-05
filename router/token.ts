import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/create", async (req: Request, res: Response) => {
  const { role = "user" } = req.body;
  const token = await jwt.sign({ role }, "secret");
  res.status(201).json({
    token,
  });
});

module.exports = router;
