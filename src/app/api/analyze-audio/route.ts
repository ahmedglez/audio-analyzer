import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import Replicate from "replicate";
import { z } from "zod";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const replicateApiKey = process.env.REPLICATE_API_KEY;

const TranscriptionSchema = z.object({
	transcription: z.string(),
	analysis: z.object({
		prohibitedWords: z.array(z.string()).optional(),
		mentionedClientName: z.boolean(),
		clientObjections: z.array(z.string()).optional(),
		offeredDiscount: z.boolean(),
		emotionalTone: z.string(),
		customAnalysis: z.array(
			z.object({
				requirement: z.string(),
				result: z.string(),
			})
		),
	}),
	summary: z.string().optional(),
});

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("audio") as Blob;
		const apiKey = formData.get("apiKey") as string;
		const requirements = JSON.parse(formData.get("requirements") as string);
		const maxSizeMB = 25;
		const maxSizeBytes = maxSizeMB * 1024 * 1024;

		if (file.size > maxSizeBytes) {
			return NextResponse.json(
				{ error: "El archivo de audio es demasiado grande" },
				{ status: 400 }
			);
		}

		if (!apiKey || !file || !requirements || !Array.isArray(requirements)) {
			return NextResponse.json(
				{ error: "apiKey, audio y requirements son obligatorios" },
				{ status: 400 }
			);
		}

		const openai = new OpenAI({ apiKey });
		const replicate = new Replicate({ auth: replicateApiKey });

		// Convertir el archivo a un formato que OpenAI acepte
		const audioFile = new File([file], "audio.mp3", { type: "audio/mpeg" });

		// Transcribir el audio usando Replicate
		const transcription = await replicate.run(
			"vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
			{
				input: {
					task: "transcribe",
					audio:
						"data:audio/mp3;base64," +
						Buffer.from(await audioFile.arrayBuffer()).toString("base64"),
					language: "None",
					timestamp: "chunk",
					batch_size: 64,
					diarise_audio: false,
				},
			}
		);

		// Construir el prompt para formatear la transcripción y analizarla
		const prompt = `
Tienes la siguiente transcripción de una llamada telefónica:
"${transcription}"

**Tareas:**
1. Reformatea la transcripción en estilo diálogo entre "Agente" y "Cliente".
2. Realiza un análisis según los siguientes requisitos:
   ${requirements.map((req, index) => `${index + 1}. ${req}`).join("\n")}

**Formato de salida esperado (JSON válido):**
\`\`\`json
{
  "transcription": "### Conversación\\n**Agente:** Hola, ¿cómo estás?\\n**Cliente:** Bien, gracias.",
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
\`\`\`

**Reglas:**
- La transcripción debe ser un solo string en formato Markdown.
- Usa caracteres de escape (\n y \\) para mantener el formato sin romper el JSON.
- No devuelvas texto fuera del JSON.
`;

		// Llamada a OpenAI para analizar y reformatear la transcripción
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "system", content: prompt }],
			temperature: 0.7,
			response_format: zodResponseFormat(TranscriptionSchema, "transcription"),
		});

		// Obtener la respuesta generada
		let result = response.choices[0]?.message?.content || "{}";

		// Limpiar delimitadores de código JSON si existen
		result = result.replace(/```json|```/g, "").trim();

		// Devolver la respuesta final como JSON válido
		return NextResponse.json(JSON.parse(result));
	} catch (error) {
		console.error("Error en el procesamiento:", error);
		return NextResponse.json(
			{ error: "Error procesando la solicitud" },
			{ status: 500 }
		);
	}
}
