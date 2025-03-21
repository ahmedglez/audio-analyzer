import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("audio") as Blob;
		const apiKey = formData.get("apiKey") as string;
		const requirements = JSON.parse(formData.get("requirements") as string);

		if (!apiKey || !file || !requirements || !Array.isArray(requirements)) {
			return NextResponse.json(
				{ error: "apiKey, audio y requirements son obligatorios" },
				{ status: 400 }
			);
		}

		const openai = new OpenAI({ apiKey });

		// Convertir el archivo a un formato que OpenAI acepte
		const audioFile = new File([file], "audio.mp3", { type: "audio/mpeg" });

		// Transcribir el audio usando OpenAI
		const transcriptionResponse = await openai.audio.transcriptions.create({
			model: "whisper-1",
			file: audioFile,
		});

		const transcription = transcriptionResponse.text;

		// Construir el prompt para OpenAI con los requisitos
		const prompt = `
      Tienes la siguiente transcripción de una llamada telefónica:
      "${transcription}"

      Debes analizarla según los siguientes requisitos:
      ${requirements.map((req, index) => `${index + 1}. ${req}`).join("\n")}

      Devuelve la respuesta en formato JSON con la siguiente estructura exacta:

      {
        "transcription": "<transcripción>",
        "analysis": {
          "prohibitedWords": ["<palabra1>", "<palabra2>"],
          "mentionedClientName": <true | false>,
          "clientObjections": ["<objeción1>", "<objeción2>"],
          "offeredDiscount": <true | false>,
          "emotionalTone": "<tono general>",
          "customAnalysis": [
            {
              "requirement": "<nombre del requisito>",
              "result": "<resultado del análisis>"
            }
          ]
        },
        "summary": "<resumen>"
      }

      Asegúrate de devolver las claves exactamente como se especifican arriba.
`;

		// Llamada a OpenAI para analizar la transcripción
		const response = await openai.chat.completions.create({
			model: "gpt-4-turbo",
			messages: [{ role: "system", content: prompt }],
			temperature: 0.7,
		});

		// Obtener la respuesta generada
		const result = response.choices[0]?.message?.content || "{}";

		// Limpiar delimitadores de código si existen
		const cleanedResult = result.replace(/```json|```/g, "").trim();

		return NextResponse.json({
			...JSON.parse(cleanedResult),
		});
	} catch (error) {
		console.error("Error en el procesamiento:", error);
		return NextResponse.json(
			{ error: "Error procesando la solicitud" },
			{ status: 500 }
		);
	}
}
