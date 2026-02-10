
const express=require('express');
const submitRouter=express.Router();
const userMiddleware=require('../middleware/userMiddleware')
const {submitCode,runCode,FetchSubmission,praticeData}=require('../controllers/userSubmission')


submitRouter.post("/submit/:id",userMiddleware,submitCode);
submitRouter.post("/run/:id",userMiddleware,runCode);
submitRouter.post('/fetchSubmissionp/',userMiddleware,FetchSubmission)
submitRouter.post(`/pratice`,praticeData);
module.exports=submitRouter;