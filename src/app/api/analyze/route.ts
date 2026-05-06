import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/services/ai";

export const maxDuration = 60; // Allow for longer AI processing if needed

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" }, 
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a JPG, PNG or WebP image." }, 
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File too large. Max size is 10MB." }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const result = await analyzeImage(buffer, file.type);
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: result
    });
  } catch (error: any) {
    console.error("API Route Error:", error);
    
    const status = error.message?.includes("API Key") ? 500 : 422;
    const message = error.message || "An unexpected error occurred during analysis";
    
    return NextResponse.json(
      { success: false, error: message }, 
      { status }
    );
  }
}
