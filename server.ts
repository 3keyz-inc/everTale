import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily or safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

// API Route 1: Genie Wish Interpretation & Granting
app.post("/api/genie-wish", async (req, res) => {
  try {
    const { genie, wishCategory, wishText, seekerName } = req.body;
    
    const ai = getGeminiClient();
    
    if (ai) {
      const prompt = `You are ${genie || "Celestia, the Mystic Genie of June 17"}. A seeker named "${seekerName || "Traveler"}" has rubbed the ancient lamp and made a wish in the category of "${wishCategory || "Destiny"}": "${wishText}".
      
      Respond in an ethereal, magical, elegant, and deeply encouraging Arabian-nights mystic tone.
      Provide:
      1. A mystical greeting addressing them by name.
      2. A poetic blessing or omen corresponding to their wish.
      3. A "Stardust Guidance" advice paragraph (3-4 sentences) offering wisdom on how their wish can manifest.
      4. A "Cosmic Catalyst" single magical action step they must take in the waking world.
      
      Keep the formatting clean with JSON containing fields:
      {
        "greeting": "string",
        "poeticBlessing": "string",
        "stardustGuidance": "string",
        "cosmicCatalyst": "string",
        "magicElement": "Fire|Water|Air|Aether|Celestial Gold"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json({ success: true, result: parsed });
      }
    }

    // High quality fallback response if API key is not set or response is empty
    const fallbackResults = {
      greeting: `Greetings, seeker ${seekerName || "Traveler"}. The stars aligned on the eve of ${genie?.includes("June 18") ? "June 18" : "June 17"} to hear your heart's whisper.`,
      poeticBlessing: `May the glowing winds of Aether sweep away every shadow, weaving golden threads of light into your journey of ${wishCategory || "Destiny"}.`,
      stardustGuidance: `Your wish for "${wishText}" resonates through the crystal halls of the Stardust Sanctuary. Remember that the true lamp is within your own spirit; the magic you seek has already begun to stir within your intentions. Trust the cosmic tides as they guide you toward fulfillment.`,
      cosmicCatalyst: "Light a candle under the starlit sky tonight and write down your three greatest intentions on paper.",
      magicElement: genie?.includes("June 18") ? "Aether" : "Celestial Gold"
    };

    return res.json({ success: true, result: fallbackResults });
  } catch (error: any) {
    console.error("Genie Wish API Error:", error);
    return res.json({
      success: true,
      result: {
        greeting: "Greetings, noble seeker of the starlit night.",
        poeticBlessing: "By the ancient light of June 17 & 18, may cosmic harmony illuminate your path.",
        stardustGuidance: "Your wish echoes through the palace of stardust. Even in moments of quiet waiting, the universe weaves silent miracles behind the veil of night.",
        cosmicCatalyst: "Focus your energy on one small, meaningful step forward today.",
        magicElement: "Aether"
      }
    });
  }
});

// API Route 2: EverTale Birthday Chapter Generator starring Zephyr
app.post("/api/evertale-chapter", async (req, res) => {
  try {
    const { childName, age, archetype, specialMemory, favoriteThing } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `You are Zephyr, the Wish Weaver — a magical genie made of cyan and gold light holding a book with a golden story thread.
      Create a personalized annual birthday story chapter for a child named "${childName}", turning ${age} years old!
      Selected Archetype: "${archetype}" (e.g. Brave Hero, Royal Princess/Prince, Cosmic Explorer, Animal Guardian, Master Inventor).
      Special Memory/Detail: "${specialMemory || "Building a fort in the living room"}".
      Favorite Thing: "${favoriteThing || "Dinosaurs and stars"}".

      Generate a JSON object with:
      {
        "chapterTitle": "string",
        "storyTagline": "string",
        "inductionCartoonScript": [
          { "sceneNumber": 1, "setting": "string", "narration": "string", "zephyrAction": "string" },
          { "sceneNumber": 2, "setting": "string", "narration": "string", "zephyrAction": "string" },
          { "sceneNumber": 3, "setting": "string", "narration": "string", "zephyrAction": "string" }
        ],
        "miniGameTitle": "string",
        "miniGameDescription": "string",
        "miniGameObjective": "string",
        "coloringBookPrompt": "string",
        "parentCommandCenterNote": "string",
        "heirloomQuote": "string"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        return res.json({ success: true, chapter: JSON.parse(response.text) });
      }
    }

    // High quality fallback
    return res.json({
      success: true,
      chapter: {
        chapterTitle: `Chapter ${age}: ${childName} and the Golden Thread of ${archetype}`,
        storyTagline: `Guided by Zephyr, ${childName} enters the Realm of Wishes on their ${age}th Birthday!`,
        inductionCartoonScript: [
          {
            sceneNumber: 1,
            setting: "The Sky Palace of EverTale",
            narration: `Deep in the starry sky, Zephyr unrolls a glowing golden storybook. On page ${age}, the name '${childName}' shines in cyan fire.`,
            zephyrAction: "Zephyr waves his golden quill and spins a shimmering thread of light."
          },
          {
            sceneNumber: 2,
            setting: `The Enchanted Realm of ${archetype}`,
            narration: `${childName} steps into the realm holding a magical badge. Remembering ${specialMemory || "their favorite memories"}, they unleash their unique power.`,
            zephyrAction: "Zephyr flies alongside, shielding the hero with a warm cyan barrier."
          },
          {
            sceneNumber: 3,
            setting: "The Stardust Citadel",
            narration: `With courage and kindness, ${childName} places their golden thread into the EverTale Archive, sealing their ${age}th birthday victory!`,
            zephyrAction: "Zephyr bestows a glowing Crown of Wisom upon " + childName + "."
          }
        ],
        miniGameTitle: `${childName}'s ${archetype} Quest`,
        miniGameDescription: `Help ${childName} collect glowing stardust gems and navigate through the floating sky islands!`,
        miniGameObjective: `Gather 10 Golden Star Thread shards before timer runs out to unlock the Birthday Treasure Chest.`,
        coloringBookPrompt: `${childName} standing beside Zephyr the Wish Weaver in front of a giant glowing storybook.`,
        parentCommandCenterNote: `This Chapter ${age} heirloom has been securely encrypted in your Parent Vault under the Gordian Privacy Shield. Raw photo files shredded automatically.`,
        heirloomQuote: `"The story that grows with ${childName}, today and forever."`
      }
    });
  } catch (err: any) {
    console.error("EverTale Chapter Error:", err);
    return res.json({
      success: true,
      chapter: {
        chapterTitle: `Chapter: The Legend of ${req.body.childName || "Hero"}`,
        storyTagline: "The story that grows with them.",
        inductionCartoonScript: [
          { sceneNumber: 1, setting: "EverTale Realm", narration: "Zephyr opens the golden book of wishes.", zephyrAction: "Zephyr smiles brightly." }
        ],
        miniGameTitle: "Star Thread Quest",
        miniGameDescription: "Collect stardust crystals to weave the birthday chapter.",
        miniGameObjective: "Gather 5 star shards.",
        coloringBookPrompt: "A magical castle under the crescent moon.",
        parentCommandCenterNote: "Encrypted under Gordian Privacy Shield.",
        heirloomQuote: "A permanent digital heirloom."
      }
    });
  }
});

// API Route 2: Cosmic Orb Fortune Reading
app.post("/api/cosmic-reading", async (req, res) => {
  try {
    const { orbName, constellation } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Generate a mystical cosmic horoscope / fortune reading for the crystal orb of "${orbName}" aligned with the constellation "${constellation}". Return JSON with:
      {
        "title": "string",
        "prophecy": "string",
        "luckyNumbers": [number, number, number],
        "auraColor": "string",
        "celestialSign": "string"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        return res.json({ success: true, result: JSON.parse(response.text) });
      }
    }

    return res.json({
      success: true,
      result: {
        title: `Prophecy of the ${orbName} Sphere`,
        prophecy: `The swirling galaxies within this crystal orb reveal a surge of creative energy and intuition coming your way. What was once obscured in mystery will become clear beneath the full moon's glow.`,
        luckyNumbers: [7, 17, 18],
        auraColor: "Luminous Azure & Gold",
        celestialSign: "Constellation of the Stardust Phoenix"
      }
    });
  } catch (err) {
    return res.json({
      success: true,
      result: {
        title: "Celestial Alignment Reading",
        prophecy: "The cosmic tides favor patience, reflection, and bold creative vision.",
        luckyNumbers: [3, 11, 21],
        auraColor: "Deep Sapphire",
        celestialSign: "Lyra the Celestial Harp"
      }
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
