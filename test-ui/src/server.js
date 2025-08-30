const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import the document generator module
const documentGenerator = require('../modules/document-generator.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Test endpoint to check if module is working
app.get('/api/test', (req, res) => {
  try {
    // Check if all functions are available
    const functions = [
      'generateProposal',
      'generateAgreement', 
      'generatePDF',
      'generateDOC',
      'generateProposalPDF',
      'generateProposalDOC',
      'generateAgreementPDF',
      'generateAgreementDOC'
    ];

    const availableFunctions = functions.filter(func => typeof documentGenerator[func] === 'function');
    
    res.json({
      success: true,
      message: 'Module loaded successfully',
      availableFunctions: availableFunctions,
      totalFunctions: availableFunctions.length,
      expectedFunctions: functions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Module test failed',
      error: error.message
    });
  }
});

// Generate proposal endpoint
app.post('/api/generate-proposal', async (req, res) => {
  try {
    const { apiKey, projectDetails, projectName, pricing, extraDetails } = req.body;
    
    if (!apiKey || !projectDetails || !projectName || !pricing) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: apiKey, projectDetails, projectName, pricing'
      });
    }

    const proposal = await documentGenerator.generateProposal(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      extraDetails || ''
    );

    res.json({
      success: true,
      message: 'Proposal generated successfully',
      data: proposal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate proposal',
      error: error.message
    });
  }
});

// Generate agreement endpoint
app.post('/api/generate-agreement', async (req, res) => {
  try {
    const { apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails } = req.body;
    
    if (!apiKey || !projectDetails || !projectName || !pricing || !partyA || !partyB) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: apiKey, projectDetails, projectName, pricing, partyA, partyB'
      });
    }

    const agreement = await documentGenerator.generateAgreement(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      partyA,
      partyB,
      extraDetails || ''
    );

    res.json({
      success: true,
      message: 'Agreement generated successfully',
      data: agreement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate agreement',
      error: error.message
    });
  }
});

// Generate PDF endpoint
app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { content, filename } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: content'
      });
    }

    const pdfBuffer = await documentGenerator.generatePDF(content, filename || 'document');
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document'}.pdf"`);
    
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF',
      error: error.message
    });
  }
});

// Generate DOC endpoint
app.post('/api/generate-doc', async (req, res) => {
  try {
    const { content, filename } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: content'
      });
    }

    const docBuffer = await documentGenerator.generateDOC(content, filename || 'document');
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document'}.docx"`);
    
    res.send(Buffer.from(docBuffer));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate DOC',
      error: error.message
    });
  }
});

// Generate proposal PDF endpoint
app.post('/api/generate-proposal-pdf', async (req, res) => {
  try {
    const { apiKey, projectDetails, projectName, pricing, extraDetails, filename } = req.body;
    
    if (!apiKey || !projectDetails || !projectName || !pricing) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: apiKey, projectDetails, projectName, pricing'
      });
    }

    const pdfBuffer = await documentGenerator.generateProposalPDF(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      extraDetails || '',
      filename || 'proposal'
    );
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'proposal'}.pdf"`);
    
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate proposal PDF',
      error: error.message
    });
  }
});

// Generate agreement PDF endpoint
app.post('/api/generate-agreement-pdf', async (req, res) => {
  try {
    const { apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails, filename } = req.body;
    
    if (!apiKey || !projectDetails || !projectName || !pricing || !partyA || !partyB) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: apiKey, projectDetails, projectName, pricing, partyA, partyB'
      });
    }

    const pdfBuffer = await documentGenerator.generateAgreementPDF(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      partyA,
      partyB,
      extraDetails || '',
      filename || 'agreement'
    );
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'agreement'}.pdf"`);
    
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate agreement PDF',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test UI Server running on http://localhost:${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, '../public')}`);
  console.log(`🔧 Module location: ${path.join(__dirname, '../modules/document-generator.js')}`);
});
