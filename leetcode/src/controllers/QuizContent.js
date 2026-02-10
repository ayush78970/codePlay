const express = require('express');
const https = require('https');

const app = express();
app.use(express.json()); // to parse JSON POST body

// Function to fetch JSON from GitHub
const DataContent = (topic) => {
  return new Promise((resolve, reject) => {
   
    const url = `https://raw.githubusercontent.com/ayush78970/dataStorage/refs/heads/main/${topic}.json`;

    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (err) {
          reject(err);
        }
      });

    }).on('error', (err) => reject(err));
  });
};


const fetchData=async (req,res)=>{
  let topic=req.body.topic;
// console.log(topic);

 
if(topic=='Linked List')
  topic='linkedList';


  try {
    
  
    const quizData= await DataContent(topic);

    res.json(quizData);
  } catch (error) {
     res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
}


// Export DataContent function if needed elsewhere
module.exports = { fetchData }; 
