import { generatePDF } from "./index.js";
import fs from "fs";

async function testUrgentFix() {
  try {
    console.log("Testing URGENT fix for address clipping and centering...");

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
    const pdfBuffer = await generatePDF(sampleContent, "urgent-fix-test");

    // Save to file
    fs.writeFileSync("urgent-fix-test.pdf", Buffer.from(pdfBuffer));

    console.log("✅ PDF generated successfully! Check urgent-fix-test.pdf");
    console.log("📋 The PDF should have:");
    console.log(
      '   - Company name "TRIOSTACK TECHNOLOGIES PRIVATE LIMITED" at the top (centered)'
    );
    console.log("   - Company details with GUARANTEED no clipping:");
    console.log("     * Line 1: CIN and Phone (centered)");
    console.log("     * Line 2: Address (centered, with automatic wrapping)");
    console.log("     * COMPLETE address: PLOT NO 20 BLOCK H-1A SECTOR 63 Noida Gautam Buddha Nagar Uttar Pradesh India 201301");
    console.log("   - NO CLIPPING - every character visible");
    console.log("   - Proper centering of all elements");
    console.log("   - Smaller fonts: Company name (16pt), Headings (14pt), Body (10pt), Details (8pt)");
    console.log('   - No "E-COMMERCE APPLICATION" title - starts directly with "EXECUTIVE SUMMARY"');
    console.log("   - Deep black headings for all sections");
    console.log("   - Professional black and white formatting");
  } catch (error) {
    console.error("❌ Error generating PDF:", error.message);
  }
}

testUrgentFix();
