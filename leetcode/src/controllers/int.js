const { GoogleGenAI } = require("@google/genai"); // Ensure the package name is correct

// const ai = new GoogleGenAI({apiKey:'AIzaSyAiL4K1kkYL1z3toLtdBXVAW8hv2NJTQ0s'});

const interview=async ()=> {
    const ai = new GoogleGenAI({apiKey:'AIzaSyAiL4K1kkYL1z3toLtdBXVAW8hv2NJTQ0s'});
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Hello there",
    config: {
      systemInstruction: "You are a interview you ask question of cpp data structure. you act like interviwer if user say hellow you ask first question ..",
    },
  });
  console.log(response.text);
}

 interview();







// node int.js  

// AIzaSyAiL4K1kkYL1z3toLtdBXVAW8hv2NJTQ0s





// const interview=async (req,res)=> {

//   const ai = new GoogleGenAI({apiKey:'AIzaSyAiL4K1kkYL1z3toLtdBXVAW8hv2NJTQ0s'});
  
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "Hello there",
//     config: {
//       systemInstruction: "You are a interview you ask question of cpp data structure. you act like interviwer if user say hellow you ask first question ..",
//     },
//   });
//   console.log(response.text);
// }