import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeImage(imageBuffer: Buffer, mimeType: string): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this food image and provide a detailed nutritional breakdown in JSON format.
    The response must strictly follow this structure:
    {
      "items": [
        {
          "name": "string",
          "portion": "string",
          "macros": { "calories": number, "protein": number, "carbs": number, "fat": number },
          "healthScore": number (0-100),
          "description": "string",
          "ingredients": ["string"]
        }
      ],
      "totalMacros": { "calories": number, "protein": number, "carbs": number, "fat": number },
      "averageHealthScore": number,
      "recommendations": ["string"],
      "healthyAlternatives": ["string"],
      "dietaryNotes": ["string"]
    }
    Be accurate with calorie and macro estimations based on visible portion sizes.
  `;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType
      }
    }
  ]);

  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from the response text (handling potential markdown formatting)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse AI response");
  
  return JSON.parse(jsonMatch[0]);
}
