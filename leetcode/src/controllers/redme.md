<!-- const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/about',
  headers: {
    'x-rapidapi-key': 'cc33248e67mshf1078aebed017c3p149c13jsnfb864c125017',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData(); -->








const { GoogleGenAI } = require("@google/genai");

const solveDoubt = async (req, res) => {
    try {
        const { messages, title, description, testCases, startCode } = req.body;
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

        
        // Format messages correctly for GenAI
        const formattedMessages = messages.map(msg => ({
            role: msg.role,
            parts: msg.parts.map(p => ({
                data: { text: p.text }  // wrap text inside data
            }))
        }));

        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: formattedMessages,
            config: {
                systemInstruction: `
You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

## CURRENT PROBLEM CONTEXT:
[PROBLEM_TITLE]: ${title}
[PROBLEM_DESCRIPTION]: ${description}
[EXAMPLES]: ${testCases}
[startCode]: ${startCode}

## INTERACTION GUIDELINES:
- Provide hints, code review, optimal solutions, complexity analysis, and alternative approaches.
- Always explain concepts clearly.
- Only discuss topics related to the current DSA problem.
`
            }
        });

        res.status(201).json({ message: response.text });
    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = solveDoubt;
