import { generatePDF } from './index.js';
import fs from 'fs';

async function testSeparatorFormat() {
  try {
    console.log('Testing PDF generation with separator format...');
    
    // Sample content to test the header
    const sampleContent = `EXECUTIVE SUMMARY
This is a comprehensive proposal for developing a modern e-commerce application.

PROJECT OVERVIEW
The project involves creating a full-featured e-commerce platform.

OUR APPROACH
We will follow an agile development methodology.

DELIVERABLES
- Complete e-commerce website
- Admin dashboard
- Mobile-responsive design

TIMELINE
The project will be completed in 8-12 weeks.

INVESTMENT
Total project cost: ₹ 40,000

NEXT STEPS
1. Review and approve this proposal
2. Sign the agreement
3. Begin project development`;

    // Generate PDF
    const pdfBuffer = await generatePDF(sampleContent, 'separator-format-test');
    
    // Save to file
    fs.writeFileSync('separator-format-test.pdf', Buffer.from(pdfBuffer));
    
    console.log('✅ PDF generated successfully! Check separator-format-test.pdf');
    console.log('📋 The PDF should have:');
    console.log('   - Company name "TRIOSTACK TECHNOLOGIES PRIVATE LIMITED" at the top');
    console.log('   - Company details with bold labels: CIN | Phone | Address');
    console.log('   - Smaller, beautified fonts');
    console.log('   - No "PROJECT PROPOSAL" title at the top');
    console.log('   - Deep black headings for all sections');
    console.log('   - Professional black and white formatting');
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
  }
}

testSeparatorFormat();
