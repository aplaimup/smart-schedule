const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env" });

async function listModels() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("No API key found in .env");
      return;
    }
    
    let allModels = [];
    let pageToken = "";
    do {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}${pageToken ? '&pageToken=' + pageToken : ''}`);
      const data = await res.json();
      if (data.models) {
        allModels.push(...data.models.map(m => m.name));
      }
      pageToken = data.nextPageToken;
    } while (pageToken);
    
    console.log("Available models:");
    console.log(allModels.join("\n"));
  } catch (err) {
    console.error("Error:", err);
  }
}

listModels();
