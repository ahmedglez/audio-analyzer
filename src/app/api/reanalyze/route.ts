import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const apiKey = formData.get("apiKey") as string;
		const transcription = formData.get("transcription") as string;
		const requirements = JSON.parse(formData.get("requirements") as string);

		if (
			!apiKey ||
			!transcription ||
			!requirements ||
			!Array.isArray(requirements)
		) {
			return NextResponse.json(
				{ error: "apiKey, transcription y requirements son obligatorios" },
				{ status: 400 }
			);
		}

		const openai = new OpenAI({ apiKey });

		// Construcción del prompt en español con formato Markdown
		const prompt = `
      Tienes la siguiente transcripción de una llamada telefónica en español:
      "${transcription}"

      **Formato requerido para la transcripción en Markdown**:
      - Cada línea debe indicar quién habla, usando "**Agente:**" o "**Cliente:**".
      - Usa doble salto de línea (\n\n) para separar los turnos de conversación.
      - No agregues información adicional, solo la transcripción formateada.

      **Análisis de la llamada según los siguientes requisitos**:
      ${requirements.map((req, index) => `${index + 1}. ${req}`).join("\n")}

      **Salida esperada en JSON**:

      {
        "transcription": "<transcripción en Markdown>",
        "analysis": {
          "prohibitedWords": ["<palabra1>", "<palabra2>"],
          "mentionedClientName": <true | false>,
          "clientObjections": ["<objeción1>", "<objeción2>"],
          "offeredDiscount": <true | false>,
          "emotionalTone": "<tono general>",
          "customAnalysis": [
            {
              "requirement": "<nombre del requisito>",
              "result": "<resultado del análisis en español>"
            }
          ]
        },
        "summary": "<resumen en español>"
      }

      **Importante**: Asegúrate de que la clave "transcription" contenga el diálogo en formato Markdown y que las demás claves sean devueltas tal como se especifica.
    `;

		// Llamada a OpenAI para analizar la transcripción y formatearla
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
