const certificateModel = require('../models/certificate');
const { generateCertificateId } = require('../utils/generateId');

const generateCertificate = async (req, res) => {
  try {
    const { userId, userName, courseName } = req.body;

    // 1. Generate unique certificate ID
    const certificateId = generateCertificateId(userName);

    // 2. Create verification URL (used in QR code)
    const verificationURL = `http://localhost:5173/certificate/${certificateId}`;

    // 3. Save certificate in database
    const newCert = await certificateModel.create({
      userId,
      userName,
      courseName,
      certificateId,
      verificationURL
    });

    // 4. Send response to frontend
    return res.status(201).json({
      success: true,
      message: "Certificate generated successfully",
      certificate: newCert
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Certificate generation failed",
      error: error.message
    });
  }
};
// https://chatgpt.com/c/693c78cf-4c1c-8323-97d0-bfc8baec73be
module.exports = { generateCertificate };
