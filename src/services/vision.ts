
export async function detectLabels(imageBuffer: Buffer) {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;
  if (!apiKey) throw new Error("Vision API Key not configured");

  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
  const payload = {
    requests: [
      {
        image: {
          content: imageBuffer.toString("base64"),
        },
        features: [
          { type: "LABEL_DETECTION", maxResults: 10 },
          { type: "TEXT_DETECTION" },
          { type: "IMAGE_PROPERTIES" }
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data.responses[0];
  } catch (error) {
    console.error("Vision API Error:", error);
    return null;
  }
}
