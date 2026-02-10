import { useState } from 'react';
import axiosClient from "../utils/axiosClient";

export  const useSubmission = (problemId) => {
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [fetchResult,setFetchResult]=useState(null);
//  console.log("code");
  const handleRun = async (code, language) => {
    setLoading(true);
    setRunResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language
      });
      setRunResult(response.data);
    
    } catch (error) {
      console.log('Error running code:', error);
      setRunResult({
        success: false,
        error: error.response?.data?.message || 'Internal server error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (code, language) => {
    setLoading(true);
    setSubmitResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code,
        language
      });
      setSubmitResult(response.data);
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmissionFetchAll=async()=>{
    // 
    setLoading(true);
    setFetchResult(null)
    try {
      const response=await axiosClient.post(`/submission/fetchSubmission/${problemId}`);
      setFetchResult(response.data)

    } catch (error) {
      
    }
  }
  return {
    loading,
    runResult,
    submitResult,
    handleRun,
    handleSubmit
  };
};