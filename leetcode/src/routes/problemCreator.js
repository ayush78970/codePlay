const express=require('express')

const problemRauter=express.Router();
const adminMiddleware=require('../middleware/adminMiddleware');
const userMiddleware=require('../middleware/userMiddleware');

const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem}=require("../controllers/userProblem");
const problem = require('../models/problem');

problemRauter.post("/create",adminMiddleware,createProblem)
problemRauter.put("/update/:id",adminMiddleware,updateProblem)
problemRauter.delete("/delete/:id",adminMiddleware,deleteProblem);


problemRauter.get("/ProblemById/:id",userMiddleware,getProblemById);
problemRauter.get('/getAllProblem',userMiddleware,getAllProblem);
problemRauter.get('/ProblemSlovedByUser',userMiddleware,solvedAllProblembyUser)
problemRauter.get('/sumittedproblem/:pid',userMiddleware,submittedProblem)

module.exports=problemRauter;
// const adminMiddleware=require('../middleware/adminMiddleware');