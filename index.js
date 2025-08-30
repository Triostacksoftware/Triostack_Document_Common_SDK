const OpenAI = require("openai");
const { jsPDF } = require("jspdf");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} = require("docx");

/**
 * Generate a professional sales proposal using OpenAI API
 * @param {string} apiKey - OpenAI API key
 * @param {string} projectDetails - Detailed project information
 * @param {string} projectName - Name of the project
 * @param {string} pricing - Pricing information
 * @param {string} extraDetails - Additional context/details for the AI
 * @returns {Promise<string>} Generated proposal content
 */
async function generateProposal(
  apiKey,
  projectDetails,
  projectName,
  pricing,
  extraDetails = ""
) {
  try {
    const client = new OpenAI({
      apiKey: apiKey,
    });

    const prompt = `
    Create a professional sales proposal (not an email) formatted with clear headings,
    based on the following project information:

    Project Name: ${projectName}
    Project Details: ${projectDetails}
    Pricing: ${pricing}
    ${extraDetails ? `Additional Details: ${extraDetails}` : ""}
    
    The proposal should include these sections with clear headings:
    - EXECUTIVE SUMMARY
    - PROJECT OVERVIEW
    - OUR APPROACH
    - DELIVERABLES
    - TIMELINE
    - INVESTMENT
    - NEXT STEPS
    
    Use clear, professional headings in ALL CAPS for each section.
    Make the content compelling and tailored to the specific project.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        {
          role: "system",
          content:
            "You are a professional business proposal writer. Create compelling, well-structured sales proposals that convert leads to customers.",
        },
        { role: "user", content: prompt },
      ],
      stream: false,
    });

    return response.choices[0]?.message?.content || "No proposal generated.";
  } catch (error) {
    throw new Error(`Failed to generate proposal: ${error.message}`);
  }
}

/**
 * Generate a legal agreement between two parties using OpenAI API
 * @param {string} apiKey - OpenAI API key
 * @param {string} projectDetails - Detailed project information
 * @param {string} projectName - Name of the project
 * @param {string} pricing - Pricing information
 * @param {string} partyA - Information about Party A (name, details, etc.)
 * @param {string} partyB - Information about Party B (name, details, etc.)
 * @param {string} extraDetails - Additional context/details for the AI
 * @returns {Promise<string>} Generated agreement content
 */
async function generateAgreement(
  apiKey,
  projectDetails,
  projectName,
  pricing,
  partyA,
  partyB,
  extraDetails = ""
) {
  try {
    const client = new OpenAI({
      apiKey: apiKey,
    });

    const prompt = `
    Create a professional legal agreement between two parties, formatted with clear headings,
    based on the following information:

    Project Name: ${projectName}
    Project Details: ${projectDetails}
    Pricing: ${pricing}
    Party A: ${partyA}
    Party B: ${partyB}
    ${extraDetails ? `Additional Details: ${extraDetails}` : ""}
    
    The agreement should include:
    - Clear identification of both parties
    - Project scope and deliverables
    - Terms and conditions
    - Payment terms and schedule
    - Timeline and milestones
    - Intellectual property rights
    - Confidentiality clauses
    - Termination conditions
    - Legal jurisdiction
    - Professional legal formatting
    `;

    const response = await client.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        {
          role: "system",
          content:
            "You are a legal document writer. Create comprehensive, professional legal agreements that protect both parties' interests while being clear and enforceable.",
        },
        { role: "user", content: prompt },
      ],
      stream: false,
    });

    return response.choices[0]?.message?.content || "No agreement generated.";
  } catch (error) {
    throw new Error(`Failed to generate agreement: ${error.message}`);
  }
}

/**
 * Convert HTML content to PDF using jsPDF with deep black headings
 * @param {string} htmlContent - HTML content to convert
 * @param {string} filename - Name of the PDF file (without .pdf extension)
 * @returns {Promise<Uint8Array>} PDF as Uint8Array
 */
async function generatePDF(htmlContent, filename = "document") {
  try {
    // Create PDF directly with jsPDF
    const pdf = new jsPDF("p", "mm", "a4");

    // Set initial font and styling
    pdf.setFont("helvetica");
    pdf.setFontSize(10);

    let yPosition = 20;
    const lineHeight = 7;

    // Add company name at the top (centered)
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0); // Deep black color
    pdf.setFont("helvetica", "bold");
    const companyName = "TRIOSTACK TECHNOLOGIES PRIVATE LIMITED";
    const companyNameWidth = pdf.getTextWidth(companyName);
    const centerX = (210 - companyNameWidth) / 2; // Center on A4 page (210mm width)
    pdf.text(companyName, centerX, yPosition);

    yPosition += lineHeight + 8; // Extra spacing after company name

    // Add company details below (centered with separators)
    // Set consistent font size for all company details
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");

    // Combined company details with separators (labels bold, content normal)
    const detailsParts = [
      { label: "CIN:", content: "U62012UP2025PTC226106" },
      { label: "Phone:", content: "+91 9211941924" },
      { label: "Website:", content: "www.triostack.in" },
      { label: "Email:", content: "info@triostack.in" },
      {
        label: "Address:",
        content:
          "IIMT LBF, Plot No. 19, 20, near IIMT Group of Colleges, Knowledge Park III, Greater Noida, Uttar Pradesh 201310",
      },
    ];

    // Line 1: CIN, Phone, Website (centered)
    pdf.setFont("helvetica", "bold");
    const cinLabelWidth = pdf.getTextWidth("CIN: ");
    pdf.setFont("helvetica", "normal");
    const cinContentWidth = pdf.getTextWidth("U62012UP2025PTC226106");

    pdf.setFont("helvetica", "bold");
    const phoneLabelWidth = pdf.getTextWidth("Phone: ");
    pdf.setFont("helvetica", "normal");
    const phoneContentWidth = pdf.getTextWidth("+91 9211941924");

    pdf.setFont("helvetica", "bold");
    const websiteLabelWidth = pdf.getTextWidth("Website: ");
    pdf.setFont("helvetica", "normal");
    const websiteContentWidth = pdf.getTextWidth("www.triostack.in");

    const separatorWidth = pdf.getTextWidth(" | ");
    const totalFirstLineWidth =
      cinLabelWidth +
      cinContentWidth +
      separatorWidth +
      phoneLabelWidth +
      phoneContentWidth +
      separatorWidth +
      websiteLabelWidth +
      websiteContentWidth;

    // Center the first line
    const firstLineStartX = (210 - totalFirstLineWidth) / 2;
    let currentX = firstLineStartX;

    // Draw CIN
    pdf.setFont("helvetica", "bold");
    pdf.text("CIN: ", currentX, yPosition);
    currentX += cinLabelWidth;

    pdf.setFont("helvetica", "normal");
    pdf.text("U62012UP2025PTC226106", currentX, yPosition);
    currentX += cinContentWidth;

    // Add separator
    pdf.text(" | ", currentX, yPosition);
    currentX += separatorWidth;

    // Draw Phone
    pdf.setFont("helvetica", "bold");
    pdf.text("Phone: ", currentX, yPosition);
    currentX += phoneLabelWidth;

    pdf.setFont("helvetica", "normal");
    pdf.text("+91 9211941924", currentX, yPosition);
    currentX += phoneContentWidth;

    // Add separator
    pdf.text(" | ", currentX, yPosition);
    currentX += separatorWidth;

    // Draw Website
    pdf.setFont("helvetica", "bold");
    pdf.text("Website: ", currentX, yPosition);
    currentX += websiteLabelWidth;

    pdf.setFont("helvetica", "normal");
    pdf.text("www.triostack.in", currentX, yPosition);

    // Line 2: Email (centered)
    yPosition += lineHeight;

    pdf.setFont("helvetica", "bold");
    const emailLabelWidth = pdf.getTextWidth("Email: ");
    pdf.setFont("helvetica", "normal");
    const emailContentWidth = pdf.getTextWidth("info@triostack.in");

    const totalSecondLineWidth = emailLabelWidth + emailContentWidth;
    const secondLineStartX = (210 - totalSecondLineWidth) / 2;

    pdf.setFont("helvetica", "bold");
    pdf.text("Email: ", secondLineStartX, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "info@triostack.in",
      secondLineStartX + emailLabelWidth,
      yPosition
    );

    // Line 3: Address (centered) - ULTIMATE FIX
    yPosition += lineHeight;

    // Use a much smaller max width to ensure no clipping
    const maxAddressWidth = 110; // Further reduced from 130 to 110 for much better right margin
    const fullAddress =
      "IIMT LBF, Plot No. 19, 20, near IIMT Group of Colleges, Knowledge Park III, Greater Noida, Uttar Pradesh 201310";

    // Split the address content only (without the label)
    const addressLines = pdf.splitTextToSize(fullAddress, maxAddressWidth);

    // Calculate total height needed for address
    const addressHeight = addressLines.length * lineHeight;

    // Center the entire address block
    const addressBlockStartY = yPosition;

    for (let i = 0; i < addressLines.length; i++) {
      const line = addressLines[i];
      const lineWidth = pdf.getTextWidth(line);
      const lineStartX = (210 - lineWidth) / 2; // Center each line

      if (i === 0) {
        // First line: Draw label and content with proper spacing
        pdf.setFont("helvetica", "bold");
        const labelWidth = pdf.getTextWidth("Address: ");
        const labelStartX = lineStartX - labelWidth;

        pdf.text("Address: ", labelStartX, yPosition);
        pdf.setFont("helvetica", "normal");
        pdf.text(line, lineStartX, yPosition);
      } else {
        // Continuation lines: just the content, centered
        pdf.setFont("helvetica", "normal");
        pdf.text(line, lineStartX, yPosition);
      }

      yPosition += lineHeight;
    }

    yPosition += lineHeight;

    yPosition += 5; // Extra spacing after address

    // Add a line separator with proper margins
    pdf.setDrawColor(0, 0, 0);
    pdf.line(25, yPosition, 185, yPosition); // Further reduced from 20-190 to 25-185 for even better margins
    yPosition += 15; // Space after line

    // Split content into lines that fit the page width with proper margins
    const pageWidth = 140; // Further reduced from 150 to 140 for even more right margin/padding
    const lines = pdf.splitTextToSize(htmlContent, pageWidth);

    // Add content to PDF with deep black headings
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if we need a new page
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }

      // Check if this line is a heading (starts with # or is in ALL CAPS)
      const isHeading =
        line.trim().startsWith("#") ||
        (line.trim().length > 3 &&
          line.trim() === line.trim().toUpperCase() &&
          line.trim().length < 50);

      if (isHeading) {
        // Set heading styling with deep black color
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0); // Deep black color for headings
        pdf.setFont("helvetica", "bold");

        // Remove # symbols if present
        const headingText = line.replace(/^#+\s*/, "").trim();
        pdf.text(headingText, 25, yPosition); // Further increased from 20 to 25 for even better left margin

        // Reset styling for next line
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0); // Black color
        pdf.setFont("helvetica", "normal");
        yPosition += lineHeight + 3; // Extra spacing after headings
      } else {
        // Regular text
        pdf.setTextColor(0, 0, 0); // Black color
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.text(line, 25, yPosition); // Further increased from 20 to 25 for even better left margin
        yPosition += lineHeight;
      }
    }

    return pdf.output("arraybuffer");
  } catch (error) {
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}

/**
 * Convert content to DOC format using docx library
 * @param {string} content - Content to convert
 * @param {string} filename - Name of the DOC file (without .docx extension)
 * @returns {Promise<Uint8Array>} DOC as Uint8Array
 */
async function generateDOC(content, filename = "document") {
  try {
    // Split content into paragraphs
    const paragraphs = content.split("\n\n").filter((p) => p.trim());

    // Create document structure
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Company name at the top
            new Paragraph({
              children: [
                new TextRun({
                  text: "TRIOSTACK TECHNOLOGIES PRIVATE LIMITED",
                  size: 36,
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
            }),
            // Company details with separators (bold labels) - Line 1
            new Paragraph({
              children: [
                new TextRun({
                  text: "CIN: ",
                  size: 18,
                  bold: true,
                }),
                new TextRun({
                  text: "U62012UP2025PTC226106",
                  size: 18,
                  bold: false,
                }),
                new TextRun({
                  text: " | Phone: ",
                  size: 18,
                  bold: true,
                }),
                new TextRun({
                  text: "+91 9211941924",
                  size: 18,
                  bold: false,
                }),
                new TextRun({
                  text: " | Website: ",
                  size: 18,
                  bold: true,
                }),
                new TextRun({
                  text: "www.triostack.in",
                  size: 18,
                  bold: false,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            // Company details - Line 2
            new Paragraph({
              children: [
                new TextRun({
                  text: "Email: ",
                  size: 18,
                  bold: true,
                }),
                new TextRun({
                  text: "info@triostack.in",
                  size: 18,
                  bold: false,
                }),
                new TextRun({
                  text: " | Address: ",
                  size: 18,
                  bold: true,
                }),
                new TextRun({
                  text: "IIMT LBF, Plot No. 19, 20, near IIMT Group of Colleges, Knowledge Park III, Greater Noida, Uttar Pradesh 201310",
                  size: 18,
                  bold: false,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            // Document title
            new Paragraph({
              text: filename.toUpperCase(),
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            ...paragraphs.map(
              (paragraph) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: paragraph.trim(),
                      size: 24,
                    }),
                  ],
                  spacing: { after: 200 },
                })
            ),
          ],
        },
      ],
    });

    // Generate DOC file
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  } catch (error) {
    throw new Error(`Failed to generate DOC: ${error.message}`);
  }
}

/**
 * Generate proposal and convert to PDF
 * @param {string} apiKey - OpenAI API key
 * @param {string} projectDetails - Detailed project information
 * @param {string} projectName - Name of the project
 * @param {string} pricing - Pricing information
 * @param {string} extraDetails - Additional context/details for the AI
 * @param {string} filename - Name of the PDF file (without .pdf extension)
 * @returns {Promise<Uint8Array>} PDF as Uint8Array
 */
async function generateProposalPDF(
  apiKey,
  projectDetails,
  projectName,
  pricing,
  extraDetails = "",
  filename = "proposal"
) {
  try {
    // Generate proposal content
    const proposalContent = await generateProposal(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      extraDetails
    );

    // Create formatted content for PDF
    const formattedContent = `${projectName}\n\n${proposalContent}`;

    // Generate PDF
    return await generatePDF(formattedContent, filename);
  } catch (error) {
    throw new Error(`Failed to generate proposal PDF: ${error.message}`);
  }
}

/**
 * Generate agreement and convert to PDF
 * @param {string} apiKey - OpenAI API key
 * @param {string} projectDetails - Detailed project information
 * @param {string} projectName - Name of the project
 * @param {string} pricing - Pricing information
 * @param {string} partyA - Information about Party A
 * @param {string} partyB - Information about Party B
 * @param {string} extraDetails - Additional context/details for the AI
 * @param {string} filename - Name of the PDF file (without .pdf extension)
 * @returns {Promise<Uint8Array>} PDF as Uint8Array
 */
async function generateAgreementPDF(
  apiKey,
  projectDetails,
  projectName,
  pricing,
  partyA,
  partyB,
  extraDetails = "",
  filename = "agreement"
) {
  try {
    // Generate agreement content
    const agreementContent = await generateAgreement(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      partyA,
      partyB,
      extraDetails
    );

    // Create formatted content for PDF
    const formattedContent = `${projectName}\n\n${agreementContent}`;

    // Generate PDF
    return await generatePDF(formattedContent, filename);
  } catch (error) {
    throw new Error(`Failed to generate agreement PDF: ${error.message}`);
  }
}

/**
 * Generate proposal and convert to DOC
 * @param {string} apiKey - OpenAI API key
 * @param {string} projectDetails - Detailed project information
 * @param {string} projectName - Name of the project
 * @param {string} pricing - Pricing information
 * @param {string} extraDetails - Additional context/details for the AI
 * @param {string} filename - Name of the DOC file (without .docx extension)
 * @returns {Promise<Uint8Array>} DOC as Uint8Array
 */
async function generateProposalDOC(
  apiKey,
  projectDetails,
  projectName,
  pricing,
  extraDetails = "",
  filename = "proposal"
) {
  try {
    // Generate proposal content
    const proposalContent = await generateProposal(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      extraDetails
    );

    // Create formatted content for DOC
    const formattedContent = `${projectName}\n\n${proposalContent}`;

    // Generate DOC
    return await generateDOC(formattedContent, filename);
  } catch (error) {
    throw new Error(`Failed to generate proposal DOC: ${error.message}`);
  }
}

/**
 * Generate agreement and convert to DOC
 * @param {string} apiKey - OpenAI API key
 * @param {string} projectDetails - Detailed project information
 * @param {string} projectName - Name of the project
 * @param {string} pricing - Pricing information
 * @param {string} partyA - Information about Party A
 * @param {string} partyB - Information about Party B
 * @param {string} extraDetails - Additional context/details for the AI
 * @param {string} filename - Name of the DOC file (without .docx extension)
 * @returns {Promise<Uint8Array>} DOC as Uint8Array
 */
async function generateAgreementDOC(
  apiKey,
  projectDetails,
  projectName,
  pricing,
  partyA,
  partyB,
  extraDetails = "",
  filename = "agreement"
) {
  try {
    // Generate agreement content
    const agreementContent = await generateAgreement(
      apiKey,
      projectDetails,
      projectName,
      pricing,
      partyA,
      partyB,
      extraDetails
    );

    // Create formatted content for DOC
    const formattedContent = `${projectName}\n\n${agreementContent}`;

    // Generate DOC
    return await generateDOC(formattedContent, filename);
  } catch (error) {
    throw new Error(`Failed to generate agreement DOC: ${error.message}`);
  }
}

// Export all functions for CommonJS compatibility
module.exports = {
  generateProposal,
  generateAgreement,
  generatePDF,
  generateDOC,
  generateProposalPDF,
  generateProposalDOC,
  generateAgreementPDF,
  generateAgreementDOC,
};
