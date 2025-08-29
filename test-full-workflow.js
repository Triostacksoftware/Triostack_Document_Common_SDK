import { generateProposalPDF } from './index.js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testFullWorkflow() {
  try {
    console.log('Testing full proposal generation workflow...');
    
    // Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log('⚠️  No OpenAI API key found. Please set OPENAI_API_KEY in your .env file');
      console.log('   Skipping AI content generation, testing PDF generation only...');
      
      // Test with sample content
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

      const { generatePDF } = await import('./index.js');
      const pdfBuffer = await generatePDF(sampleContent, 'sample-proposal');
      fs.writeFileSync('sample-proposal.pdf', Buffer.from(pdfBuffer));
      console.log('✅ Sample PDF generated successfully! Check sample-proposal.pdf');
      return;
    }
    
    // Test parameters
    const projectDetails = "E-commerce website with user management, product catalog, shopping cart, payment processing, and order management system";
    const projectName = "E-Commerce Application";
    const pricing = "₹ 40,000";
    const extraDetails = "smooth navigation, it enhances engagement and sales. Our address: Email: info@triostack.in Phone: +91 9211941924 Address: Plot 19/20, IIMT LBF Incubation Center";
    
    console.log('📝 Generating AI-powered proposal...');
    const pdfBuffer = await generateProposalPDF(apiKey, projectDetails, projectName, pricing, extraDetails, 'ecommerce-proposal');
    
    // Save to file
    fs.writeFileSync('ecommerce-proposal.pdf', Buffer.from(pdfBuffer));
    
    console.log('✅ Full workflow completed successfully!');
    console.log('📄 Generated: ecommerce-proposal.pdf');
    console.log('🎨 The PDF includes deep black headings and company name at the top.');
    console.log('📋 Content includes structured sections: Executive Summary, Project Overview, Our Approach, etc.');
    
  } catch (error) {
    console.error('❌ Error in full workflow:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

testFullWorkflow();
