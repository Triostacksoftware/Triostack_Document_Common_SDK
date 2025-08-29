import OpenAI from "openai";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

/**
 * Generate a professional sales proposal using OpenAI API
 * @param {string} apiKey - OpenAI API key
 * @param {string} projectDetails - Detailed project information
 * @param {string} projectName - Name of the project
 * @param {string} pricing - Pricing information
 * @param {string} extraDetails - Additional context/details for the AI
 * @returns {Promise<string>} Generated proposal content
 */
export async function generateProposal(apiKey, projectDetails, projectName, pricing, extraDetails = "") {
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
    ${extraDetails ? `Additional Details: ${extraDetails}` : ''}
    
    The proposal should include:
    - A warm introduction
    - Key benefits tailored to the project
    - Clear next steps
    - Professional formatting with clear sections
    - Compelling call-to-action
    `;

    const response = await client.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        {
          role: "system",
          content: "You are a professional business proposal writer. Create compelling, well-structured sales proposals that convert leads to customers.",
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
export async function generateAgreement(apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails = "") {
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
    ${extraDetails ? `Additional Details: ${extraDetails}` : ''}
    
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
          content: "You are a legal document writer. Create comprehensive, professional legal agreements that protect both parties' interests while being clear and enforceable.",
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
 * Convert HTML content to PDF using jsPDF
 * @param {string} htmlContent - HTML content to convert
 * @param {string} filename - Name of the PDF file (without .pdf extension)
 * @returns {Promise<Uint8Array>} PDF as Uint8Array
 */
export async function generatePDF(htmlContent, filename = "document") {
  try {
    // Create PDF directly with jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Set font and styling
    pdf.setFont('helvetica');
    pdf.setFontSize(12);
    
    // Split content into lines that fit the page width
    const pageWidth = 190; // A4 width minus margins
    const lines = pdf.splitTextToSize(htmlContent, pageWidth);
    
    let yPosition = 20;
    const lineHeight = 7;
    
    // Add content to PDF
    for (let i = 0; i < lines.length; i++) {
      // Check if we need a new page
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(lines[i], 10, yPosition);
      yPosition += lineHeight;
    }
    
    return pdf.output('arraybuffer');
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
export async function generateDOC(content, filename = "document") {
  try {
    // Split content into paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    // Create document structure
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: filename.toUpperCase(),
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          ...paragraphs.map(paragraph => 
            new Paragraph({
              children: [
                new TextRun({
                  text: paragraph.trim(),
                  size: 24
                })
              ],
              spacing: { after: 200 }
            })
          )
        ]
      }]
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
export async function generateProposalPDF(apiKey, projectDetails, projectName, pricing, extraDetails = "", filename = "proposal") {
  try {
    // Generate proposal content
    const proposalContent = await generateProposal(apiKey, projectDetails, projectName, pricing, extraDetails);
    
    // Create formatted content for PDF
    const formattedContent = `PROJECT PROPOSAL\n\n${projectName}\n\n${proposalContent}`;
    
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
export async function generateAgreementPDF(apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails = "", filename = "agreement") {
  try {
    // Generate agreement content
    const agreementContent = await generateAgreement(apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails);
    
    // Create formatted content for PDF
    const formattedContent = `LEGAL AGREEMENT\n\n${projectName}\n\n${agreementContent}`;
    
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
export async function generateProposalDOC(apiKey, projectDetails, projectName, pricing, extraDetails = "", filename = "proposal") {
  try {
    // Generate proposal content
    const proposalContent = await generateProposal(apiKey, projectDetails, projectName, pricing, extraDetails);
    
    // Create formatted content for DOC
    const formattedContent = `PROJECT PROPOSAL\n\n${projectName}\n\n${proposalContent}`;
    
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
export async function generateAgreementDOC(apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails = "", filename = "agreement") {
  try {
    // Generate agreement content
    const agreementContent = await generateAgreement(apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails);
    
    // Create formatted content for DOC
    const formattedContent = `LEGAL AGREEMENT\n\n${projectName}\n\n${agreementContent}`;
    
    // Generate DOC
    return await generateDOC(formattedContent, filename);
  } catch (error) {
    throw new Error(`Failed to generate agreement DOC: ${error.message}`);
  }
}

// Default export for backward compatibility
export default {
  generateProposal,
  generateAgreement,
  generatePDF,
  generateDOC,
  generateProposalPDF,
  generateProposalDOC,
  generateAgreementPDF,
  generateAgreementDOC
};
