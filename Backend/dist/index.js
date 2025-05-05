"use strict";
const express = require("express");
const app = express();
const { connectDb } = require("./config/db");
const taskRouter = require("./router/task");
const tokenRouter = require("./router/token");
connectDb();
app.use(express.json());
app.use("/token", tokenRouter);
app.use("/task", taskRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
