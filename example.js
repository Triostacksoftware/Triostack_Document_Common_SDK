import { generateProposal, generateAgreement } from './index.js';
import dotenv from 'dotenv';

// Load environment variables (optional)
dotenv.config();

// Example 1: Generate a Proposal
async function exampleProposal() {
  try {
    console.log('🚀 Generating Proposal...\n');
    
    const proposal = await generateProposal(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      'E-commerce platform development with advanced analytics, mobile optimization, and payment gateway integration',
      'Acme Corp E-commerce Redesign',
      '$75,000 - $95,000',
      'Client is experiencing 30% cart abandonment rate. Need improved UX, mobile-first design, and advanced analytics dashboard.'
    );
    
    console.log('📋 Generated Proposal:\n');
    console.log(proposal);
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Proposal generation failed:', error.message);
  }
}

// Example 2: Generate an Agreement
async function exampleAgreement() {
  try {
    console.log('⚖️ Generating Agreement...\n');
    
    const agreement = await generateAgreement(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      'Custom software development project including web application, mobile app, and API development',
      'TechCorp Enterprise Platform',
      '$150,000 with 30% upfront, 40% at milestone, 30% on completion',
      'TechCorp Inc., 123 Business Street, New York, NY 10001, represented by John Smith, CEO',
      'DevStudio LLC, 456 Technology Avenue, San Francisco, CA 94105, represented by Sarah Johnson, Managing Director',
      'Project timeline: 8 months. Includes 12 months of post-launch support and maintenance. Client will provide design assets and content.'
    );
    
    console.log('📄 Generated Agreement:\n');
    console.log(agreement);
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Agreement generation failed:', error.message);
  }
}

// Example 3: Generate both with minimal details
async function exampleMinimal() {
  try {
    console.log('🎯 Generating Minimal Proposal...\n');
    
    const minimalProposal = await generateProposal(
      process.env.OPENAI_API_KEY || 'your-api-key-here',
      'Website redesign',
      'Company Website Update',
      '$5,000',
      ''
    );
    
    console.log('📋 Minimal Proposal:\n');
    console.log(minimalProposal);
    console.log('\n' + '='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Minimal proposal generation failed:', error.message);
  }
}

// Run examples
async function runExamples() {
  console.log('🌟 Proposal & Agreement Generator Examples\n');
  console.log('Make sure to set your OPENAI_API_KEY in .env file or replace "your-api-key-here"\n');
  
  await exampleProposal();
  await exampleAgreement();
  await exampleMinimal();
  
  console.log('✅ All examples completed!');
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples();
}

export { exampleProposal, exampleAgreement, exampleMinimal, runExamples };
