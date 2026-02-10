const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://coderAyush:coderAyush@codingadda.ypga8gh.mongodb.net/Leetcode?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    throw error; // pass error to index.js
  }
}

module.exports = main;
