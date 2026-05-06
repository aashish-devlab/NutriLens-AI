import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "@/types";
import { detectLabels } from "./vision";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeImage(imageBuffer: Buffer, mimeType: string): Promise<AnalysisResult> {
  // Optional: Enhance context using Google Vision API before Gemini
  const visionContext = await detectLabels(imageBuffer);
  const labels = visionContext?.labelAnnotations?.map((l: any) => l.description).join(", ") || "";
  const detectedText = visionContext?.fullTextAnnotation?.text || "";

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
    Analyze this food image. 
    ${labels ? `Context from computer vision: ${labels}` : ""}
    ${detectedText ? `Detected text/labels: ${detectedText}` : ""}

    Provide a detailed nutritional breakdown.
    Return ONLY a JSON object with this structure:
    {
      "items": [
        {
          "name": "string",
          "portion": "string",
          "macros": { 
            "calories": number, 
            "protein": number, 
            "carbs": number, 
            "fat": number,
            "sugar": number,
            "fiber": number
          },
          "healthScore": number, (0-100)
          "healthConcerns": ["string"],
          "betterAlternatives": ["string"],
          "description": "string",
          "ingredients": ["string"]
        }
      ],
      "totalMacros": { 
        "calories": number, 
        "protein": number, 
        "carbs": number, 
        "fat": number,
        "sugar": number,
        "fiber": number
      },
      "averageHealthScore": number,
      "recommendations": ["string"],
      "healthyAlternatives": ["string"],
      "dietaryNotes": ["string"]
    }

    Requirements:
    - Be extremely accurate with calories and macros based on portion size.
    - If multiple items are visible, list them separately in "items".
    - "healthConcerns" should highlight high sodium, saturated fats, or hidden sugars.
    - "betterAlternatives" should suggest specific healthier versions of the detected item.
  `;

  try {
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
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("AI Analysis failed. Please try a clearer photo.");
  }
}
