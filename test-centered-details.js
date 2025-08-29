import { generatePDF } from "./index.js";
import fs from "fs";

async function testCenteredDetails() {
  try {
    console.log("Testing PDF generation with centered company details...");

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
    const pdfBuffer = await generatePDF(sampleContent, "centered-details-test");

    // Save to file
    fs.writeFileSync("centered-details-test.pdf", Buffer.from(pdfBuffer));

    console.log(
      "✅ PDF generated successfully! Check centered-details-test.pdf"
    );
    console.log("📋 The PDF should have:");
    console.log(
      '   - Company name "TRIOSTACK TECHNOLOGIES PRIVATE LIMITED" at the top (centered)'
    );
    console.log("   - Company details with proper wrapping:");
    console.log("     * CIN and Phone on first line");
    console.log("     * Address on second line (centered)");
    console.log("   - No clipping of address text");
    console.log(
      "   - Smaller fonts: Company name (16pt), Headings (14pt), Body (10pt), Details (8pt)"
    );
    console.log(
      '   - No "E-COMMERCE APPLICATION" title - starts directly with "EXECUTIVE SUMMARY"'
    );
    console.log("   - Deep black headings for all sections");
    console.log("   - Professional black and white formatting");
  } catch (error) {
    console.error("❌ Error generating PDF:", error.message);
  }
}

testCenteredDetails();
