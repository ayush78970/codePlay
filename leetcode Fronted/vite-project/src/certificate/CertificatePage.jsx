import { useParams } from "react-router";
import html2canvas from "html2canvas";
import certificateBg from "../assets/1.png";

const certificateMap = {
  "TC-839201": {
    name: "Ayush Yadav",
    topic: "React Development",
    issuedOn: "December 18, 2025",
    organization: "ThinkCode",
  },
};

function CertificatePage() {
  const { certId } = useParams();
  const cert = certificateMap[certId];

  if (!cert) {
    return <h2>Certificate not found</h2>;
  }

  const handleDownload = async () => {
    const element = document.getElementById("certificate-download");
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const image = canvas.toDataURL("image/png", 1.0);

    const link = document.createElement("a");
    link.href = image;
    link.download = `Certificate-${certId}.png`;
    link.click();
  };

  return (
    <div style={containerStyle}>
      <div
        id="certificate-download"
        style={{
          ...certificateCard,
          backgroundImage: `url(${certificateBg})`,
        }}
      >
        <div style={contentOverlay}>
          <h1 style={mainTitle}>CERTIFICATE</h1>
          <p style={subTitle}>OF COMPLETION</p>
          <p style={presentText}>This is to certify that</p>
          <h2 style={studentName}>{cert.name}</h2>
          <p style={descriptionText}>
            has successfully completed the assessment in
            <span style={topicHighlight}> {cert.topic} </span>
            reflecting exceptional commitment to learning and technical mastery.
          </p>
          <div style={footerSection}>
            <div style={footerInfo}>
              <p style={infoValue}>{cert.issuedOn}</p>
              <div style={smallLine}></div>
              <p style={infoLabel}>Date of Issue</p>
            </div>
            <div style={footerInfo}>
              <p style={signatureText}>Ayush Yadav</p>
              <div style={smallLine}></div>
              <p style={infoLabel}>Founder, {cert.organization}</p>
            </div>
          </div>
          <p style={certIdText}>Certificate ID: {certId}</p>
        </div>
      </div>

      <button onClick={handleDownload} style={primaryBtn}>
        Download Certificate
      </button>
    </div>
  );
}

/* ------------------ STYLES ------------------ */
const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 0",
};

const certificateCard = {
  width: "900px",
  height: "600px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const contentOverlay = { width: "80%", textAlign: "center" };
const mainTitle = { fontSize: "52px", letterSpacing: "8px", fontWeight: "800" };
const subTitle = { fontSize: "18px", letterSpacing: "4px", marginBottom: "20px" };
const presentText = { fontStyle: "italic", fontSize: "18px" };
const studentName = {
  fontSize: "45px",
  fontWeight: "bold",
  borderBottom: "1px solid #ddd",
  display: "inline-block",
  padding: "0 20px",
};
const descriptionText = {
  fontSize: "17px",
  lineHeight: "1.6",
  margin: "20px auto",
  maxWidth: "80%",
};
const topicHighlight = { color: "#2c5aa0", fontWeight: "bold" };
const footerSection = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "50px",
  padding: "0 50px",
};
const footerInfo = { textAlign: "center" };
const infoValue = { fontWeight: "bold" };
const infoLabel = { fontSize: "12px", color: "#888" };
const smallLine = { height: "1px", background: "#333", margin: "5px 0" };
const signatureText = {
  fontFamily: "'Brush Script MT', cursive",
  fontSize: "24px",
};
const certIdText = { fontSize: "11px", color: "#aaa", marginTop: "40px" };
const primaryBtn = {
  padding: "12px 30px",
  backgroundColor: "#2c5aa0",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default CertificatePage;
