const generateCertificateId=(userName = "USER") =>{
    const initials = userName.substring(0, 3).toUpperCase();
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();

    return `CERT-${initials}-${year}-${randomHex}`;
}
module.exports={generateCertificateId};