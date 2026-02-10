const redisClient = require("../config/redis");
const User = require("../models/user");
const Submission = require("../models/submission");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, resp) => {
  try {
    // validate the data

    validate(req.body);

    // console.log("okji I am user");
    const { firstName, emailId, password } = req.body;

    console.log("Data ", firstName, emailId, password);
    req.body.password = await bcrypt.hash(password, 10);
    //
    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
      role:user.role,
      message: "I am userAuth section  data",
    };

    resp.cookie("token", token, { maxAge: 60 * 60 * 1000 });
   

    resp.status(201).json({
      user: reply,
      message: "User Registered successfully",
      token: token,
    });
  } catch (error) {
    // console.log(error);
    resp.status(400).send("Error: " + error.message);
  }
};

// login
const login = async (req, resp) => {
  try {
    const { emailId, password } = req.body;

 
    if (!emailId || !password) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("Password Match:", match);

    if (!match) {
      throw new Error("Invalid credentials");
    }

    // ✅ Fixed jwt.sign
    const token = jwt.sign(
      {
        _id: user._id,
        emailId: user.emailId,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 * 5 }
    ); 

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
      message: "I am userAuth section  data",
    };

    resp.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    resp.status(201).json({
      user: reply,
      message: "User Registered successfully",
      token: token,
    });
  } catch (e) {
    resp.status(401).send({ error: e.message });
  }
};

// LogOut feature

const logOut = async (req, res) => {
  try {
    const { token } = req.cookies;

    const payload = jwt.decode(token);
    console.log(payload);
    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);
    // Add the token Redis blockList than clear The cokies

    // res.cookie("token",null,{expiresIn:new Date(Date.now())});
    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.send("Logged out succesfully");
  } catch (error) {
    res.status(503).send("Error", +error);
  }
};

// Admin Register feature

const adminRegister = async (req, res) => {
  try {
    console.log("Admin registration started");

    // Optional: validate input fields
    // validate(req.body);

    const { firstName, emailId, password, role } = req.body;

    // Check required fields and ensure role is admin
    if (!firstName || !emailId || !password || role !== "admin") {
      return res
        .status(400)
        .json({ error: "All fields are required and role must be admin" });
    }

    // Hash the password directly and update req.body
    req.body.password = await bcrypt.hash(password, 10); // 🔒 Password hashing

    // Create the admin user in the database using the whole req.body
    const user = await User.create(req.body); // ✅ Using req.body directly

    // Generate JWT token for the new admin
    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId, role: user.role }, // payload
      process.env.JWT_KEY, // secret key
      { expiresIn: "1h" } // expires in 1 hour
    );

    // Send token in cookie
    res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true }); // cookie set

    // Send success response
    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        emailId: user.emailId,
        role: user.role,
      },
    });
  } catch (error) {
    // Send error response once
    res.status(400).send("Error: " + error.message);
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.result._id;

    // userSchema delete
    await User.findByIdAndDelete(userId);

    // Submission se bhi delete karo...
    Submission.deleteMany({ userId });

    // await Submission.deleteMany({userId});

    res.status(200).send("Deleted Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { register, login, logOut, adminRegister, deleteProfile };
