import { generateProposalPDF, generateAgreementPDF } from './index.js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables (optional)
dotenv.config();

// Example 1: Generate Proposal PDF
async function exampleProposalPDF() {
  try {
    console.log('🚀 Generating Proposal PDF...\n');
    
    const pdfBuffer = await generateProposalPDF(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      'E-commerce platform development with advanced analytics, mobile optimization, and payment gateway integration',
      'Acme Corp E-commerce Redesign',
      '$75,000 - $95,000',
      'Client is experiencing 30% cart abandonment rate. Need improved UX, mobile-first design, and advanced analytics dashboard.',
      'acme-proposal'
    );
    
    // Save PDF to file
    fs.writeFileSync('acme-proposal.pdf', Buffer.from(pdfBuffer));
    console.log('✅ Proposal PDF generated and saved as: acme-proposal.pdf');
    console.log('📄 PDF Size:', (pdfBuffer.byteLength / 1024).toFixed(2), 'KB');
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Proposal PDF generation failed:', error.message);
  }
}

// Example 2: Generate Agreement PDF
async function exampleAgreementPDF() {
  try {
    console.log('⚖️ Generating Agreement PDF...\n');
    
    const pdfBuffer = await generateAgreementPDF(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      'Custom software development project including web application, mobile app, and API development',
      'TechCorp Enterprise Platform',
      '$150,000 with 30% upfront, 40% at milestone, 30% on completion',
      'TechCorp Inc., 123 Business Street, New York, NY 10001, represented by John Smith, CEO',
      'DevStudio LLC, 456 Technology Avenue, San Francisco, CA 94105, represented by Sarah Johnson, Managing Director',
      'Project timeline: 8 months. Includes 12 months of post-launch support and maintenance. Client will provide design assets and content.',
      'techcorp-agreement'
    );
    
    // Save PDF to file
    fs.writeFileSync('techcorp-agreement.pdf', Buffer.from(pdfBuffer));
    console.log('✅ Agreement PDF generated and saved as: techcorp-agreement.pdf');
    console.log('📄 PDF Size:', (pdfBuffer.byteLength / 1024).toFixed(2), 'KB');
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Agreement PDF generation failed:', error.message);
  }
}

// Example 3: Generate both PDFs
async function generateBothPDFs() {
  try {
    console.log('🎯 Generating Both PDFs...\n');
    
    // Generate proposal PDF
    const proposalPDF = await generateProposalPDF(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      'Website redesign and SEO optimization',
      'Company Website Update',
      '$5,000',
      'Need modern design and better search engine visibility',
      'website-proposal'
    );
    
    // Generate agreement PDF
    const agreementPDF = await generateAgreementPDF(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      'Website redesign and SEO optimization project',
      'Company Website Update',
      '$5,000',
      'Company Name, 123 Main St, City, State',
      'WebDev Studio, 456 Tech Ave, City, State',
      'Project includes design, development, and 3 months of SEO support',
      'website-agreement'
    );
    
    // Save both PDFs
    fs.writeFileSync('website-proposal.pdf', Buffer.from(proposalPDF));
    fs.writeFileSync('website-agreement.pdf', Buffer.from(agreementPDF));
    
    console.log('✅ Both PDFs generated successfully!');
    console.log('📄 Website Proposal PDF:', (proposalPDF.byteLength / 1024).toFixed(2), 'KB');
    console.log('📄 Website Agreement PDF:', (agreementPDF.byteLength / 1024).toFixed(2), 'KB');
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ PDF generation failed:', error.message);
  }
}

// Run examples
async function runPDFExamples() {
  console.log('🌟 PDF Generation Examples\n');
  console.log('Make sure to set your OPENAI_API_KEY in .env file or replace "your-api-key-here"\n');
  
  await exampleProposalPDF();
  await exampleAgreementPDF();
  await generateBothPDFs();
  
  console.log('✅ All PDF examples completed!');
  console.log('📁 Check your current directory for generated PDF files');
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPDFExamples();
}

export { exampleProposalPDF, exampleAgreementPDF, generateBothPDFs, runPDFExamples };
