import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getGeminiEmbedding = async (text: string): Promise<number[]> => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-embedding-2-preview',
    });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('[utils/gemini] Error generating embedding:', error);
    throw error;
  }
};
