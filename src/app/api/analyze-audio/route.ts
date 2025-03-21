import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { apiKey, requirements } = body;

		if (!apiKey || !requirements || !Array.isArray(requirements)) {
			return NextResponse.json(
				{ error: "apiKey y requirements son obligatorios" },
				{ status: 400 }
			);
		}

		// Inicializar cliente de OpenAI con la API Key del usuario
		const openai = new OpenAI({ apiKey });

		// Construir el prompt para OpenAI con los requisitos proporcionados
		const prompt = `
            Tienes la transcripción de una llamada telefónica.
            Debes analizarla según los siguientes requisitos:
            ${requirements.map((req, index) => `${index + 1}. ${req}`).join("\n")}
            Devuelve un análisis estructurado en formato JSON.
        `;

		// Llamada a OpenAI con el prompt
		const response = await openai.chat.completions.create({
			model: "gpt-4-turbo",
			messages: [{ role: "system", content: prompt }],
			temperature: 0.7,
		});

		// Obtener la respuesta generada
		const analysis = response.choices[0]?.message?.content || "{}";

		// Simulación de una transcripción para la respuesta
		const transcription =
			"Este es un ejemplo de transcripción del audio subido...";

		// Respuesta estructurada
		return NextResponse.json({
			transcription,
			analysis: JSON.parse(analysis), // Convertir la respuesta de OpenAI a JSON
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
