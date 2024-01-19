"use strict";
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const userRouter = require("./routes/userroutes");
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;
