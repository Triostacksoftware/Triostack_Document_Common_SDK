import OpenAI from "openai";

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
      model: "gpt-4",
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
      model: "gpt-4",
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

// Default export for backward compatibility
export default {
  generateProposal,
  generateAgreement
};
