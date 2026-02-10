const express=require('express');

const QuizRauter=express.Router();
const {fetchData} = require('../controllers/QuizContent')

QuizRauter.post('/fetchContentData',fetchData)


module.exports=QuizRauter;