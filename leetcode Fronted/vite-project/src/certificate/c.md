React (GenerateCertificate.jsx)
        |
        |  (POST request with userId / courseId)
        v
Node.js API (certificate.controller.js)
        |
        |  Generates PDF using pdfkit / puppeteer
        v
Returns PDF file
