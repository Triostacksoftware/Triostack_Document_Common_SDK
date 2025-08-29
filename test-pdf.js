import { generatePDF } from "./index.js";
import fs from "fs";

async function testPDFGeneration() {
  try {
    console.log("Testing PDF generation with deep black headings...");

    // Sample content with headings
    const sampleContent = `PROJECT PROPOSAL

EXECUTIVE SUMMARY
This is a comprehensive proposal for developing a modern e-commerce application that will enhance your business operations and customer experience.

PROJECT OVERVIEW
The project involves creating a full-featured e-commerce platform with advanced functionality including user management, product catalog, shopping cart, payment processing, and order management.

OUR APPROACH
We will follow an agile development methodology with regular client feedback and iterative improvements to ensure the final product meets all your requirements.

DELIVERABLES
- Complete e-commerce website
- Admin dashboard
- Mobile-responsive design
- Payment gateway integration
- Order management system

TIMELINE
The project will be completed in 8-12 weeks with regular milestones and progress updates.

INVESTMENT
Total project cost: ₹ 40,000
Payment terms: 50% upfront, 50% upon completion

NEXT STEPS
1. Review and approve this proposal
2. Sign the agreement
3. Begin project development
4. Regular progress meetings`;

    // Generate PDF
    const pdfBuffer = await generatePDF(sampleContent, "test-proposal");

    // Save to file
    fs.writeFileSync("test-proposal.pdf", Buffer.from(pdfBuffer));

    console.log("✅ PDF generated successfully! Check test-proposal.pdf");
    console.log(
      "The PDF should have deep black headings and company name at the top."
    );
  } catch (error) {
    console.error("❌ Error generating PDF:", error.message);
  }
}

testPDFGeneration();
