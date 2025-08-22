const geminiItinerary=require("@google/generative-ai")


const geniAi = new geminiItinerary.GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model =geniAi.getGenerativeModel({model:"gemini-1.5-flash"})

const generateItinerary = async (prompt) => {
try {
  const result =await model.generateContent(prompt);
   if (!result || !result.response) {
      throw new Error("No response from Gemini API");
    }
  return result.response.text();
} catch (error) {
   throw new Error(error.message || "Gemini API error");
}
};

module.exports = generateItinerary;