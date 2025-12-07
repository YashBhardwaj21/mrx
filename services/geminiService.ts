import { GoogleGenAI } from "@google/genai";
import { Competitor, MarketTrend, ReviewSample } from '../types';

// Initialize Gemini
// NOTE: SRS requires API Key handling. 
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * FR-007: Weekly Report Generator
 * Uses Gemini to synthesize competitor data into a markdown report.
 */
export const generateWeeklyReport = async (
  competitors: Competitor[],
  trends: MarketTrend[],
  reviews: ReviewSample[]
): Promise<string> => {
  try {
    const prompt = `
      Act as a Senior Market Research Analyst (MRX). 
      Generate a "Weekly Market Intelligence Report" based on the following data:

      Competitors: ${JSON.stringify(competitors.map(c => ({ name: c.name, price: c.price, changes: c.recentChanges })))}
      Market Trends: ${JSON.stringify(trends)}
      Recent Sentiment Samples: ${JSON.stringify(reviews)}

      The report must be in Markdown format and include these sections:
      1. Executive Summary
      2. Key Competitor Moves (Highlight price changes and new features)
      3. Market Sentiment Analysis (What are customers complaining/praising?)
      4. Strategic Recommendations (Actionable advice for the Product Manager)

      Keep it professional, concise, and "board-room ready".
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "## Error generating report.\nCould not retrieve content from Gemini.";
  } catch (error) {
    console.error("Gemini Report Error:", error);
    return "## Error generating report.\nPlease check your API Key configuration.";
  }
};

/**
 * FR-004: Review Aggregation & Sentiment Analysis
 * Generates specific pain points and strengths.
 */
export const analyzeSentimentInsights = async (reviews: ReviewSample[]): Promise<{ strengths: string[], weaknesses: string[] }> => {
  try {
    const prompt = `
      Analyze these customer reviews: ${JSON.stringify(reviews)}
      
      Identify the top 3 strengths and top 3 weaknesses mentioned across the market.
      Return purely valid JSON with this structure:
      {
        "strengths": ["string", "string", "string"],
        "weaknesses": ["string", "string", "string"]
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Sentiment Error:", error);
    return { strengths: ["High Reliability", "Good Battery"], weaknesses: ["High Price", "Bulky Design"] };
  }
};
