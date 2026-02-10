import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient";

export const useProblem = () => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { problemId } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        setProblem(response.data);
   
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  },   [problemId]);
 
  // if(problem==null){
  //   console.log("null problem");
  // }else{
  //   console.log("not null",problem);
  // }
  return { problem, loading };
};