require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { text } = require("stream/consumers");
const app1 = express();


const solveDoubt = async (req, res) => {
  try {
    console.log("hii running ai section");
    const { messages, title, description, testCases, startCode } = req.body;

    const ai = new GoogleGenAI({
      apiKey: 'AIzaSyD2oE3DytjNy6h1LmHT9w4otZ6KOtKJ1Fw'
    });

    // Convert frontend messages to Gemini format
    const formattedMessages = messages.map(msg => ({
      role: msg.role,        // "user" | "model"
      parts: msg.parts.map(p => ({
        text: p.text        // CORRECT
      }))
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: formattedMessages,
      config: {
        systemInstruction: `
You are an expert Data Structures and Algorithms (DSA) tutor.

You are helping a user solve this coding problem:

Title: ${title}

Description:
${description}

Test cases:
${testCases}

Starter code:
${startCode}

Rules:
- Give hints first.
- Then give optimized solution.
- Always explain time and space complexity.
- Only talk about this coding problem.
`
      }
    });

    const answer =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.status(200).json({ message: answer });

  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ message: "AI failed to respond" });
  }
};


const interview = async (io) => {

  io.on("connection", (socket) => {
    console.log("user Connected");

    // Store full conversation per socket
    const conversation = [];

    socket.on("userText", async (userText) => {
      console.log("The user Text", userText);
      const lang = userText.lang;

      // Push latest user message
      conversation.push({ role: "user", text: userText });

      try {
        const ai = new GoogleGenAI({
          apiKey: "AIzaSyD2oE3DytjNy6h1LmHT9w4otZ6KOtKJ1Fw"
        });

        // Inject full conversation into prompt
        const conversationContext = conversation
          .map(c => `${c.role.toUpperCase()}: ${JSON.stringify(c.text)}`)
          .join("\n");

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: conversationContext,
          config: {
            systemInstruction: `
You are a strict professional technical interviewer for ${lang}.

This is the full interview conversation so far:
${conversationContext}

Use the above conversation as full context.

Your job:
- Evaluate only the LATEST user answer.
- Say Correct / Partially correct / Incorrect.
- Explain if wrong.
- Then ask the NEXT interview question.

Rules:
- Ask only ONE question.
- Do not repeat old questions.
- Increase difficulty gradually.
- Keep real interview tone.

Special case:
- If the user says anything like:
  "I don't know"
  "dont know"
  "no idea"
  "skip"
  "pass"
Then:
- Do  explain the answer. and
- Simply ask a NEW different interview question.

`
          },
        });

        // Push AI reply
        conversation.push({ role: "ai", text: response.text });

        socket.emit("aiText", response.text);

      } catch (error) {
        console.log(error);
        socket.emit("aiText", "AI error");
      }
    });
  });
};






module.exports = {solveDoubt,interview};