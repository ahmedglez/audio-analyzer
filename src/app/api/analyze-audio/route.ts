import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("audio") as Blob;
		const apiKey = formData.get("apiKey") as string;
		const requirements = JSON.parse(formData.get("requirements") as string);

		console.log("apiKey", apiKey);
		console.log("file", file);
		console.log("requirements", requirements);

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

		console.log("transcription", transcription);

		// Construir el prompt para OpenAI con los requisitos
		const prompt = `
            Tienes la siguiente transcripción de una llamada telefónica:
            "${transcription}"

            Debes analizarla según los siguientes requisitos:
            ${requirements.map((req, index) => `${index + 1}. ${req}`).join("\n")}

            Devuelve un análisis estructurado en formato JSON.
        `;

		console.log("prompt", prompt);

		// Llamada a OpenAI para analizar la transcripción
		const response = await openai.chat.completions.create({
			model: "gpt-4-turbo",
			messages: [{ role: "system", content: prompt }],
			temperature: 0.7,
		});

		// Obtener la respuesta generada
		const analysisRaw = response.choices[0]?.message?.content || "{}";

		// Limpiar delimitadores de código si existen
		const cleanedAnalysis = analysisRaw.replace(/```json|```/g, "").trim();

		console.log("cleanedAnalysis", cleanedAnalysis);

		return NextResponse.json({
			transcription,
			analysis: JSON.parse(analysisRaw),
			summary: "Resumen generado a partir del análisis de la llamada.",
		});
	} catch (error) {
		console.error("Error en el procesamiento:", error);
		return NextResponse.json(
			{ error: "Error procesando la solicitud" },
			{ status: 500 }
		);
	}
}
