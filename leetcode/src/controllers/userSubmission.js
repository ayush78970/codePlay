
const Problem= require("../models/problem");
const Submission=require("../models/submission")
const User = require("../models/user");
const praticeSchema=require('../models/pratice');
const {getLanguageById,submitBatch,submitToken}=require("../utils/problemUtility")



const submitCode=async(req,res)=>{

 
   
    try {
        const userId=req.result._id;
      
        
        const problemId=req.params.id;
       
        
        let {code,language}=req.body;
     
        
            if(language=='cpp'){
            language='c++'
        }


        if(!userId || !problemId || !language || !code)
            return res.status(400).send("Some field is Missing");

        // Fetch the problem from database for testCase
            const problem=await Problem.findById(problemId);

            
           
            // Create a Submission
    const submittedResult = await Submission.create({
          userId,
          problemId,
          code,
          language,
          status:'pending',
          testCasesTotal:problem.hiddenTestCases.length
     })
    

         
            // submit code judge 0
            const languageId=getLanguageById(language);

            const submission=problem.hiddenTestCases.map((testcase)=>({
                source_code:code,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));
        


            const submitResult=await submitBatch(submission);

            const resultToken=await submitResult.map((value)=>value.token);

            const testResult=await submitToken(resultToken);

            // we update submitted result

            let testCasesPassed=0;
            let runtime=0;
            let memory=0;
            let status='accepted';
            let errorMessage=null;


            for(const test of testResult){
                if(test.status_id==3){
                    testCasesPassed++;
                    runtime=runtime+parseFloat(test.time)
                    memory=Math.max(memory,test.memory);
                }else{
                    if(test.status_id==4){
                        status='error'
                        errorMessage:test.stderr
                    }else{
                        status:'wrong'
                        errorMessage:test.stderr
                    }
                }
            }

            // Store the result in Database
        
            submittedResult.status=status;
            submittedResult.testCasesPassed=testCasesPassed;
            submittedResult.errorMessage=errorMessage;
            submittedResult.runtime=runtime;
            submittedResult.memory=memory;

            await submittedResult.save();

            // Problem id insert karagay userSchema if it not present there (problem Sloved)

            if(!req.result.problemSloved.includes(problemId)){
                req.result.problemSloved.push(problemId);
                await req.result.save();
            }





        res.status(201).send(submittedResult);

    } catch (error) {
        
        res.status(500).send("Internal seerver Error from backend"+error)
    }
}



const runCode=async(req,res)=>{

     try {
        const userId=req.result._id;
        const problemId=req.params.id;
        let {code,language}=req.body;
      
        console.log(language);
        if(language=='cpp'){
            language='c++'
        }
        console.log(language);
        if(!userId || !problemId || !language || !code)
            return res.status(400).send("Some field is Missing");

        // Fetch the problem from database for testCase
            const problem=await Problem.findById(problemId);

 
       
            // submit code judge 0
            const languageId=getLanguageById(language);

            const submission=problem.visibleTestCases.map((testcase)=>({
                source_code:code,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));


            const submitResult=await submitBatch(submission);

            const resultToken=await submitResult.map((value)=>value.token);

            const testResult=await submitToken(resultToken);

          console.log(testResult);

    



        return res.status(201).json(testResult);

    } catch (error) {
        
        res.status(500).send("Internal seerver error"+error)
    }

}


const FetchSubmission=async(req,res)=>{
    // Later will implement
     
     const userId=req.result._id;


  const submissions = await Submission.findOne({ userId })
    .populate("problemId", "title difficulty tags")
     .sort({ createdAt: -1 });
     console.log(submissions);
       res.status(200).json(submissions)
}



const  praticeData = async (req, res) => {
  try {
    const { quizTopic, question, options, answer, createdBy } = req.body;

    // 1. Validate required fields
    if (!quizTopic || !question || !options || !answer || !createdBy) {
      return res.status(400).json({
        message: "All fields (quizTopic, question, options, answer, createdBy) are required",
      });
    }

    // 2. Validate options count
    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({
        message: "Options must be an array of exactly 4 strings.",
      });
    }

    // 3. Save data to DB
    const newProblem = await Problem.create({
      quizTopic,
      question,
      options,
      answer,
      createdBy,
    });

    return res.status(201).json({
      message: "Problem saved successfully",
      data: newProblem,
    });
  } catch (error) {
    console.error("Error saving practice data:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports={submitCode,runCode,FetchSubmission,praticeData};