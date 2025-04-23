import { GoogleGenerativeAI } from "@google/generative-ai"

const getGeminiModel = () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
    return model;
};

export const generateContent = async ( prompt ) => {
    try {
      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      return {
        ok: true , 
        text: result.response.text()      
      }
    } catch (error) {
      return {
        ok: false,
        message: error.message
      }  
    }    
}
