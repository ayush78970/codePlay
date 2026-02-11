const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./src/config/db");
const cookieParser = require("cookie-parser");

const http = require("http");
const { Server } = require("socket.io");

const authRouter = require("./src/routes/userAuth");
const redisClient = require('./src/config/redis');
const problemRouter = require("./src/routes/problemCreator");
const submitRouter = require("./src/routes/submit");
const aiRouter = require('./src/routes/aiChatting');
const QuizRouter = require('./src/routes/quizRautes');

const cors = require('cors');
const path = require("path");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "https://codeplay-1.onrender.com" }
});

const { interview } = require("./src/controllers/solveDoubt");
interview(io);

app.use(cors({
  origin: 'https://codeplay-1.onrender.com',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/user', authRouter);
app.use("/problem", problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter); 
app.use('/Quiz', QuizRouter);

// ---------- SERVE FRONTEND ----------
const frontendPath = path.join(
  __dirname,
  "../leetcode Fronted/vite-project/dist"
);

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
// ------------------------------------

const PORT = process.env.PORT || 3000;

const InitializeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log("DB & Redis are connected");

    server.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });

  } catch (error) {
    console.log("Occurred Error:", error);
  }
};

InitializeConnection();
