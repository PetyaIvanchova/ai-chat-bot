import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
  });

export const generateCompletion = async (prompt: string) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo-2024-04-09", 
      messages: [{ role: 'user', content: prompt }],
    });
    return chatCompletion;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};

