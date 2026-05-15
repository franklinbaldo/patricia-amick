import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/horoscope", async (req, res) => {
    try {
      const { date, location, names } = req.body;
      
      const prompt = `Escribe una breve y mágica carta de amor (máximo 80 palabras) para Patricia y Amick. 
      Contexto: Se conocieron en San Pedro de Atacama bajo la Vía Láctea y una Luna Nueva el 16/04/2026.
      Patricia es brasileña, Amick es peruano. Este es un regalo de ella para él.
      Tono: Poético, místico, sin listas, puro sentimiento. Idioma: Español.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
      });

      res.json({ text: result.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Falha ao ler as estrelas. Mas o destino continua brilhante!" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
