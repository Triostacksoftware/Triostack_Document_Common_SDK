import { 
  generateProposalPDF, 
  generateProposalDOC,
  generateAgreementPDF, 
  generateAgreementDOC 
} from './index.js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables (optional)
dotenv.config();

// Example 1: Generate Proposal in both PDF and DOC formats
async function exampleProposalBothFormats() {
  try {
    console.log('🚀 Generating Proposal in both PDF and DOC formats...\n');
    
    const projectDetails = 'E-commerce platform development with advanced analytics, mobile optimization, and payment gateway integration';
    const projectName = 'Acme Corp E-commerce Redesign';
    const pricing = '$75,000 - $95,000';
    const extraDetails = 'Client is experiencing 30% cart abandonment rate. Need improved UX, mobile-first design, and advanced analytics dashboard.';
    
    // Generate PDF
    const pdfBuffer = await generateProposalPDF(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      projectDetails,
      projectName,
      pricing,
      extraDetails,
      'acme-proposal'
    );
    
    // Generate DOC
    const docBuffer = await generateProposalDOC(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      projectDetails,
      projectName,
      pricing,
      extraDetails,
      'acme-proposal'
    );
    
    // Save both files
    fs.writeFileSync('acme-proposal.pdf', Buffer.from(pdfBuffer));
    fs.writeFileSync('acme-proposal.docx', Buffer.from(docBuffer));
    
    console.log('✅ Proposal generated in both formats:');
    console.log('📄 PDF:', (pdfBuffer.byteLength / 1024).toFixed(2), 'KB');
    console.log('📝 DOC:', (docBuffer.byteLength / 1024).toFixed(2), 'KB');
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Proposal generation failed:', error.message);
  }
}

// Example 2: Generate Agreement in both PDF and DOC formats
async function exampleAgreementBothFormats() {
  try {
    console.log('⚖️ Generating Agreement in both PDF and DOC formats...\n');
    
    const projectDetails = 'Custom software development project including web application, mobile app, and API development';
    const projectName = 'TechCorp Enterprise Platform';
    const pricing = '$150,000 with 30% upfront, 40% at milestone, 30% on completion';
    const partyA = 'TechCorp Inc., 123 Business Street, New York, NY 10001, represented by John Smith, CEO';
    const partyB = 'DevStudio LLC, 456 Technology Avenue, San Francisco, CA 94105, represented by Sarah Johnson, Managing Director';
    const extraDetails = 'Project timeline: 8 months. Includes 12 months of post-launch support and maintenance. Client will provide design assets and content.';
    
    // Generate PDF
    const pdfBuffer = await generateAgreementPDF(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      projectDetails,
      projectName,
      pricing,
      partyA,
      partyB,
      extraDetails,
      'techcorp-agreement'
    );
    
    // Generate DOC
    const docBuffer = await generateAgreementDOC(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      projectDetails,
      projectName,
      pricing,
      partyA,
      partyB,
      extraDetails,
      'techcorp-agreement'
    );
    
    // Save both files
    fs.writeFileSync('techcorp-agreement.pdf', Buffer.from(pdfBuffer));
    fs.writeFileSync('techcorp-agreement.docx', Buffer.from(docBuffer));
    
    console.log('✅ Agreement generated in both formats:');
    console.log('📄 PDF:', (pdfBuffer.byteLength / 1024).toFixed(2), 'KB');
    console.log('📝 DOC:', (docBuffer.byteLength / 1024).toFixed(2), 'KB');
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Agreement generation failed:', error.message);
  }
}

// Example 3: Generate all formats for a simple project
async function generateAllFormats() {
  try {
    console.log('🎯 Generating All Formats for Simple Project...\n');
    
    const projectDetails = 'Website redesign and SEO optimization';
    const projectName = 'Company Website Update';
    const pricing = '$5,000';
    const extraDetails = 'Need modern design and better search engine visibility';
    const partyA = 'Company Name, 123 Main St, City, State';
    const partyB = 'WebDev Studio, 456 Tech Ave, City, State';
    
    // Generate all formats
    const [proposalPDF, proposalDOC, agreementPDF, agreementDOC] = await Promise.all([
      generateProposalPDF(process.env.OPENAI_API_KEY || 'your-api-key-here', projectDetails, projectName, pricing, extraDetails, 'website-proposal'),
      generateProposalDOC(process.env.OPENAI_API_KEY || 'your-api-key-here', projectDetails, projectName, pricing, extraDetails, 'website-proposal'),
      generateAgreementPDF(process.env.OPENAI_API_KEY || 'your-api-key-here', projectDetails, projectName, pricing, partyA, partyB, extraDetails, 'website-agreement'),
      generateAgreementDOC(process.env.OPENAI_API_KEY || 'your-api-key-here', projectDetails, projectName, pricing, partyA, partyB, extraDetails, 'website-agreement')
    ]);
    
    // Save all files
    fs.writeFileSync('website-proposal.pdf', Buffer.from(proposalPDF));
    fs.writeFileSync('website-proposal.docx', Buffer.from(proposalDOC));
    fs.writeFileSync('website-agreement.pdf', Buffer.from(agreementPDF));
    fs.writeFileSync('website-agreement.docx', Buffer.from(agreementDOC));
    
    console.log('✅ All formats generated successfully!');
    console.log('📄 Website Proposal PDF:', (proposalPDF.byteLength / 1024).toFixed(2), 'KB');
    console.log('📝 Website Proposal DOC:', (proposalDOC.byteLength / 1024).toFixed(2), 'KB');
    console.log('📄 Website Agreement PDF:', (agreementPDF.byteLength / 1024).toFixed(2), 'KB');
    console.log('📝 Website Agreement DOC:', (agreementDOC.byteLength / 1024).toFixed(2), 'KB');
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Multi-format generation failed:', error.message);
  }
}

// Run examples
async function runBothFormatsExamples() {
  console.log('🌟 Multi-Format Document Generation Examples\n');
  console.log('Make sure to set your OPENAI_API_KEY in .env file or replace "your-api-key-here"\n');
  console.log('This will generate both PDF and DOCX formats for each document type.\n');
  
  await exampleProposalBothFormats();
  await exampleAgreementBothFormats();
  await generateAllFormats();
  
  console.log('✅ All multi-format examples completed!');
  console.log('📁 Check your current directory for generated files:');
  console.log('   - .pdf files (PDF format)');
  console.log('   - .docx files (Microsoft Word format)');
  console.log('\n💡 You can now choose your preferred format or generate both!');
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runBothFormatsExamples();
}

export { 
  exampleProposalBothFormats, 
  exampleAgreementBothFormats, 
  generateAllFormats, 
  runBothFormatsExamples 
};
