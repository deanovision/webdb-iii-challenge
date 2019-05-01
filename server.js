const express = require("express");
const server = express();
const cohortsRouter = require("./routers/cohorts-router.js");
server.use(express.json());
server.use("/api/cohorts", cohortsRouter);
module.exports = server;
