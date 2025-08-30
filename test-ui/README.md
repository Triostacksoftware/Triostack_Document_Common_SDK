# Test UI for Triostack Document SDK

A simple web interface to test the CommonJS module functionality of the Triostack Document SDK.

## 📁 Project Structure

```
test-ui/
├── modules/
│   └── document-generator.js    # CommonJS module copy
├── public/
│   └── index.html              # Web interface
├── src/
│   └── server.js               # Express server
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd test-ui
npm install
```

### 2. Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

### 3. Open the Test UI

Navigate to `http://localhost:3001` in your browser.

## 🧪 Testing Features

### Module Status Check
- ✅ Verifies all 8 functions are available
- ✅ Tests CommonJS module loading
- ✅ Shows function availability status

### Proposal Generation
- 📋 Generate text proposals
- 📄 Generate proposal PDFs
- 🔑 Uses OpenAI API (requires valid API key)

### Agreement Generation
- ⚖️ Generate text agreements
- 📄 Generate agreement PDFs
- 🔑 Uses OpenAI API (requires valid API key)

### Document Generation
- 📄 Convert text to PDF
- 📝 Convert text to DOC
- 🎯 No API key required for these tests

## 🔧 API Endpoints

### Module Test
- `GET /api/test` - Test module loading and function availability

### Proposal Generation
- `POST /api/generate-proposal` - Generate text proposal
- `POST /api/generate-proposal-pdf` - Generate proposal PDF

### Agreement Generation
- `POST /api/generate-agreement` - Generate text agreement
- `POST /api/generate-agreement-pdf` - Generate agreement PDF

### Document Generation
- `POST /api/generate-pdf` - Convert text to PDF
- `POST /api/generate-doc` - Convert text to DOC

## 📋 Usage Instructions

### 1. Module Testing
- Click "Test Module Loading" to verify the CommonJS module works
- Should show all 8 functions as available

### 2. Proposal Testing
- Enter your OpenAI API key
- Fill in project details, name, and pricing
- Click "Generate Proposal" for text or "Generate Proposal PDF" for PDF

### 3. Agreement Testing
- Enter your OpenAI API key
- Fill in all required fields including Party A and Party B
- Click "Generate Agreement" for text or "Generate Agreement PDF" for PDF

### 4. Document Generation Testing
- Enter any text content
- Specify a filename (optional)
- Click "Generate PDF" or "Generate DOC" to test document conversion

## 🔍 What This Tests

### CommonJS Compatibility
- ✅ Module loading with `require()`
- ✅ Function exports with `module.exports`
- ✅ All dependencies (OpenAI, jsPDF, docx)

### Function Availability
- ✅ `generateProposal`
- ✅ `generateAgreement`
- ✅ `generatePDF`
- ✅ `generateDOC`
- ✅ `generateProposalPDF`
- ✅ `generateProposalDOC`
- ✅ `generateAgreementPDF`
- ✅ `generateAgreementDOC`

### Document Generation
- ✅ PDF creation with company header
- ✅ DOC creation with proper formatting
- ✅ File download functionality
- ✅ Error handling

## 🛠️ Troubleshooting

### Module Not Loading
- Check that `modules/document-generator.js` exists
- Verify all dependencies are installed
- Check Node.js version (14+ required)

### API Errors
- Ensure OpenAI API key is valid
- Check internet connection
- Verify API key has sufficient credits

### File Download Issues
- Check browser download settings
- Ensure popup blockers are disabled
- Verify file permissions

## 📊 Expected Results

### Module Test
```
✅ Module Loaded Successfully
Available Functions (8/8):
- generateProposal
- generateAgreement
- generatePDF
- generateDOC
- generateProposalPDF
- generateProposalDOC
- generateAgreementPDF
- generateAgreementDOC
```

### Document Generation
- PDF files should include Triostack company header
- DOC files should be properly formatted
- Files should download automatically

## 🔧 Development

### Adding New Tests
1. Add new endpoint in `src/server.js`
2. Add corresponding UI section in `public/index.html`
3. Add JavaScript function for the test

### Modifying the Module
1. Update `modules/document-generator.js`
2. Restart the server
3. Test the changes through the UI

## 📝 Notes

- This test UI is for development and testing purposes only
- It uses the same CommonJS module structure as the main package
- All generated files include the Triostack company branding
- The UI provides real-time feedback on module functionality

## 🎯 Success Criteria

The test UI is working correctly when:
- ✅ Module loads without errors
- ✅ All 8 functions are available
- ✅ PDF generation works (with company header)
- ✅ DOC generation works (with proper formatting)
- ✅ File downloads work correctly
- ✅ Error handling works properly
