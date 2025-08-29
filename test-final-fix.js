import { generatePDF } from "./index.js";
import fs from "fs";

async function testFinalFix() {
  try {
    console.log("Testing FINAL fix for investment section clipping...");

    // Content specifically to test the investment section
    const sampleContent = `EXECUTIVE SUMMARY
This is a comprehensive proposal for developing a modern e-commerce application with advanced features and robust architecture.

PROJECT OVERVIEW
The project involves creating a full-featured e-commerce platform with comprehensive functionality including user management, product catalog, shopping cart, payment processing, order management, and administrative dashboard.

OUR APPROACH
We will follow an agile development methodology with iterative development cycles, continuous integration, and regular stakeholder feedback sessions to ensure project success.

DELIVERABLES
- Complete e-commerce website with responsive design
- Admin dashboard with comprehensive management tools
- Mobile-responsive design for all devices
- Payment gateway integration
- Inventory management system
- Customer relationship management features

TIMELINE
The project will be completed in 8-12 weeks with regular milestones and deliverables at each phase of development.

INVESTMENT
Total project cost: ₹ 40,000 with flexible payment terms and milestone-based invoicing structure. We offer competitive pricing while maintaining the highest quality standards and ensuring timely delivery of all project components.

NEXT STEPS
1. Review and approve this comprehensive proposal
2. Sign the detailed agreement with all terms and conditions
3. Begin project development with initial planning phase
4. Establish communication channels and project management tools`;

    // Generate PDF
    const pdfBuffer = await generatePDF(sampleContent, "final-fix-test");

    // Save to file
    fs.writeFileSync("final-fix-test.pdf", Buffer.from(pdfBuffer));

    console.log("✅ PDF generated successfully! Check final-fix-test.pdf");
    console.log("📋 The PDF should have:");
    console.log(
      '   - Company name "TRIOSTACK TECHNOLOGIES PRIVATE LIMITED" at the top (centered)'
    );
    console.log("   - Company details with NO CLIPPING:");
    console.log("     * CIN and Phone on first line (centered)");
    console.log(
      "     * Address on second line (centered, complete text visible)"
    );
    console.log(
      "     * COMPLETE address: PLOT NO 20 BLOCK H-1A SECTOR 63 Noida Gautam Buddha Nagar Uttar Pradesh India 201301"
    );
    console.log("   - INVESTMENT section with NO CLIPPING:");
    console.log("     * Complete text: 'milestone-based invoicing structure'");
    console.log("     * No text cut off at 'milestone-base'");
    console.log(
      "   - Even more generous margins (140mm page width, 25mm left margin)"
    );
    console.log("   - Proper text wrapping for all content");
    console.log("   - Professional formatting throughout");
  } catch (error) {
    console.error("❌ Error generating PDF:", error.message);
  }
}

testFinalFix();
