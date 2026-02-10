import React from 'react';
// Assuming you are using Bootstrap classes (e.g., 'container', 'row', 'col')
import 'bootstrap/dist/css/bootstrap.min.css';
// Import your custom CSS file
import './Footer.css'; 
// Placeholder imports for icons (you would use an actual library like react-icons)
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaGlobe, FaEnvelope } from 'react-icons/fa'; 

const Footer = () => {
    // --- Data Structure for Easy Management ---
    const linkColumns = [
        {
            title: "Platform",
            links: ["Problems", "Contests", "Discuss", "Interview", "Store"]
        },
        {
            title: "Resources",
            links: ["Documentation", "Tutorials", "API", "Blog", "Newsletter"]
        },
        {
            title: "Company",
            links: ["About Us", "Careers", "Press", "Contact", "Partners"]
        },
        {
            title: "Support",
            links: ["Help Center", "Community", "Premium", "Status", "Feedback"]
        }
    ];

    return (
        <footer className="footer-custom">
            <div className="container">
                {/* --- Main Content Section (Logo + Link Columns) --- */}
                <div className="row">
                    {/* 1. Logo and Description Column */}
                    <div className="col-lg-4 col-md-12 mb-5 mb-lg-0">
                        <div className="d-flex align-items-center mb-3">
                            {/* Placeholder for Logo/Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#007bff" className="me-2">
                                <path d="M12 2L2 22h20L12 2zm0 18L5 6h14l-7 14z" />
                                <path d="M10 10l2 2 2-2h-4z" fill="#ffffff"/>
                            </svg>
                            <span className="h4 text-white fw-bold mb-0">CodeMaster</span>
                        </div>
                        <p className="logo-text">
                            Master your coding skills with thousands of programming challenges, competitions, and a vibrant community of developers.
                        </p>
                        {/* Social Media Icons */}
                        <div className="d-flex mt-4">
                            <a href="#" className="social-icon"><FaGithub /></a>
                            <a href="#" className="social-icon"><FaTwitter /></a>
                            <a href="#" className="social-icon"><FaLinkedin /></a>
                            <a href="#" className="social-icon"><FaYoutube /></a>
                        </div>
                    </div>

                    {/* 2. Link Columns */}
                    {linkColumns.map((column, index) => (
                        <div className="col-lg-2 col-md-3 col-sm-6 mb-4 mb-lg-0" key={index}>
                            <h5>{column.title}</h5>
                            <ul className="list-unstyled">
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href={`/${link.toLowerCase().replace(' ', '-')}`}>{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* --- Separator and Bottom Section --- */}
                <div className="row footer-bottom">
                    <div className="col-md-6 order-2 order-md-1">
                        {/* Bottom Links */}
                        <div className="d-flex flex-wrap">
                            <a href="/privacy" className="me-3">Privacy Policy</a>
                            <a href="/terms" className="me-3">Terms of Service</a>
                            <a href="/cookie" className="me-3">Cookie Policy</a>
                            <a href="/accessibility">Accessibility</a>
                        </div>
                    </div>

                    <div className="col-md-6 text-md-end order-1 order-md-2 mb-3 mb-md-0">
                        {/* Language and Newsletter */}
                        <a href="#" className="d-inline-flex align-items-center me-4">
                            <FaGlobe className="me-1" /> English
                        </a>
                        <a href="#" className="d-inline-flex align-items-center">
                            <FaEnvelope className="me-1" /> Newsletter
                        </a>
                    </div>
                </div>

                {/* --- Copyright Section --- */}
                <div className="row mt-4">
                    <div className="col text-center text-md-start">
                        <p className="mb-0">
                            © 2025 CodeMaster. All rights reserved. Built with passion for developers worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;












/* Custom CSS (e.g., in Footer.css or Footer.module.css) */

.footer-custom {
  /* Dark background color from the image */
  background-color: #171b22; 
  color: #c4c6c9; /* Light gray text color */
  padding-top: 4rem;
  padding-bottom: 2rem;
  font-size: 0.9rem; /* Slightly smaller font for the content */
}

/* Style for the logo section text */
.footer-custom .logo-text {
  font-size: 0.95rem;
  max-width: 300px;
  margin-top: 0.5rem;
}

/* Style for column headings (Platform, Resources, etc.) */
.footer-custom h5 {
  color: #f8f9fa; /* White color for headings */
  font-weight: 600;
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

/* Styling for the links */
.footer-custom a {
  color: #c4c6c9; /* Default link color */
  text-decoration: none;
  display: block; /* Makes links take up full line for easy clicking */
  margin-bottom: 0.75rem;
  transition: color 0.2s;
}

.footer-custom a:hover {
  color: #007bff; /* Example: A blue color for hover effect */
}

/* Social media icons/buttons */
.social-icon {
  width: 36px;
  height: 36px;
  background-color: #242933; /* Slightly lighter dark background for icons */
  color: #c4c6c9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 0.5rem;
  transition: background-color 0.2s;
}

.social-icon:hover {
  background-color: #007bff;
  color: #ffffff;
}

/* Copyright and bottom links section */
.footer-bottom {
  border-top: 1px solid #242933; /* Darker border line */
  padding-top: 1.5rem;
  margin-top: 3rem;
}