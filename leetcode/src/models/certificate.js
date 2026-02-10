const mongoose= require('mongoose')
const certificateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    courseName: { type: String, required: true },
    certificateId: { type: String, required: true, unique: true },
    verificationURL: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now }
});

const certificateModel=mongoose.model("Certificate", certificateSchema);
module.exports={certificateModel};
