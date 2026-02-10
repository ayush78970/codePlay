const mongoose = require('mongoose');
const {Schema} = mongoose;

const praticeSchema = new mongoose.Schema(
  {
    quizTopic: {
      type: String,
      required: true,
      trim: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String], // array of 4 options
      validate: {
        validator: function (v) {
          return v.length === 4; // must always be 4 options
        },
        message: "A question must have exactly 4 options",
      },
      required: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // collection name
      required: true,
    },
  },
  { timestamps: true }
);

const practice= mongoose.model("PraticeQuestion", praticeSchema);
module.exports={practice}
