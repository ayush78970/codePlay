const express = require('express');
const aiRouter =  express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const {solveDoubt}=require('../controllers/solveDoubt')

aiRouter.post('/chat', solveDoubt);
// aiRouter.post('/interview',interview)

module.exports = aiRouter;