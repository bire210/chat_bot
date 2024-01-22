const express = require("express");
const {askQuestion, eventQuery} = require("../controller/dailogFlow.controller");

const dailogFlowRouter = express.Router();

dailogFlowRouter.post("/text_query", askQuestion);
dailogFlowRouter.post("/event_query", eventQuery);

module.exports = dailogFlowRouter;
