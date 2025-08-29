# Proposal Agreement Generator

A powerful npm package for generating professional sales proposals and legal agreements using OpenAI's GPT-4 API.

## Features

- 🚀 **Proposal Generation**: Create compelling sales proposals with AI assistance
- ⚖️ **Agreement Generation**: Generate comprehensive legal agreements between parties
- 🤖 **AI-Powered**: Uses OpenAI's GPT-4 for high-quality content generation
- 📝 **Customizable**: Add extra details and context for tailored outputs
- 🔒 **Secure**: Pass your own API key for complete control
- 📦 **Lightweight**: Minimal dependencies, easy to integrate

## Installation

```bash
npm install proposal-agreement-generator
```

## Quick Start

```javascript
import { generateProposal, generateAgreement } from 'proposal-agreement-generator';

// Your OpenAI API key
const apiKey = 'your-openai-api-key-here';

// Generate a proposal
const proposal = await generateProposal(
  apiKey,
  'E-commerce platform development with advanced analytics',
  'Acme Corp Website Redesign',
  '$50,000',
  'Client needs improved conversion rates and mobile optimization'
);

// Generate an agreement
const agreement = await generateAgreement(
  apiKey,
  'Web application development project',
  'TechCorp Mobile App',
  '$75,000',
  'TechCorp Inc., 123 Business St, New York, NY',
  'DevStudio LLC, 456 Tech Ave, San Francisco, CA',
  'Project includes backend API, mobile app, and 6 months of support'
);
```

## API Reference

### `generateProposal(apiKey, projectDetails, projectName, pricing, extraDetails?)`

Generates a professional sales proposal.

**Parameters:**
- `apiKey` (string): Your OpenAI API key
- `projectDetails` (string): Detailed description of the project
- `projectName` (string): Name of the project
- `pricing` (string): Pricing information
- `extraDetails` (string, optional): Additional context for the AI

**Returns:** Promise<string> - Generated proposal content

**Example:**
```javascript
const proposal = await generateProposal(
  'sk-your-api-key',
  'Custom CRM system with advanced reporting and mobile app',
  'Enterprise CRM Solution',
  '$25,000 - $35,000',
  'Client is a growing startup with 50+ employees. Need scalable solution.'
);
```

### `generateAgreement(apiKey, projectDetails, projectName, pricing, partyA, partyB, extraDetails?)`

Generates a comprehensive legal agreement between two parties.

**Parameters:**
- `apiKey` (string): Your OpenAI API key
- `projectDetails` (string): Detailed description of the project
- `projectName` (string): Name of the project
- `pricing` (string): Pricing information
- `partyA` (string): Information about Party A (name, details, etc.)
- `partyB` (string): Information about Party B (name, details, etc.)
- `extraDetails` (string, optional): Additional context for the AI

**Returns:** Promise<string> - Generated agreement content

**Example:**
```javascript
const agreement = await generateAgreement(
  'sk-your-api-key',
  'Software development and maintenance services',
  'Cloud Platform Development',
  '$100,000 with milestone payments',
  'Acme Corporation, 123 Main St, New York, NY 10001',
  'TechSolutions Inc., 456 Innovation Dr, Austin, TX 78701',
  'Project includes 12 months of development and 24 months of support'
);
```

## Generated Content Structure

### Proposals Include:
- Warm introduction
- Key benefits tailored to the project
- Clear next steps
- Professional formatting with clear sections
- Compelling call-to-action

### Agreements Include:
- Clear identification of both parties
- Project scope and deliverables
- Terms and conditions
- Payment terms and schedule
- Timeline and milestones
- Intellectual property rights
- Confidentiality clauses
- Termination conditions
- Legal jurisdiction

## Error Handling

The package includes comprehensive error handling:

```javascript
try {
  const proposal = await generateProposal(apiKey, details, name, pricing);
  console.log(proposal);
} catch (error) {
  console.error('Generation failed:', error.message);
}
```

## Environment Variables

While the package doesn't require `.env` files, you can use them in your application:

```bash
# .env
OPENAI_API_KEY=your-api-key-here
```

```javascript
import dotenv from 'dotenv';
dotenv.config();

const proposal = await generateProposal(
  process.env.OPENAI_API_KEY,
  // ... other parameters
);
```

## Requirements

- Node.js 16+ (ES modules support)
- OpenAI API key
- Internet connection for API calls

## Dependencies

- `openai`: Official OpenAI Node.js client
- `dotenv`: Environment variable management (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the examples

## Disclaimer

This package generates content using AI. While the content is professional and well-structured, it's recommended to have legal professionals review any agreements before use in business transactions.

---

**Note**: The generated content is for informational purposes only and should not be considered as legal advice.
