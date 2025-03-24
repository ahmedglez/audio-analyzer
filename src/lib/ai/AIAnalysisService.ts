import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import Replicate from "replicate";
import { z } from "zod";

const TranscriptionSchema = z.object({
	transcription: z.string(),
	analysis: z.object({
		customAnalysis: z.array(
			z.object({
				requirement: z.string(),
				result: z.string(),
			})
		),
	}),
	summary: z.string().optional(),
});

export class AIAnalysisService {
	private openai: OpenAI;
	private replicate: Replicate;

	constructor(apiKey: string) {
		this.openai = new OpenAI({ apiKey });
		this.replicate = new Replicate({ auth: apiKey });
	}

	async analyze(
		transcription: string,
		requirements: string[],
		platform: "openai" | "replicate"
	) {
		const prompt = `Eres un asistente de análisis de llamadas. Tu tarea es procesar la siguiente transcripción y devolver un JSON válido con el análisis correspondiente.

### Tareas:
1. Reformatea la transcripción en estilo diálogo entre "Agente" y "Cliente" en formato Markdown.
2. Realiza un análisis según los siguientes requisitos:
    ${requirements.map((req) => `- ${req}`).join("\n    ")}
3. Escribe un resumen de la llamada.

### Formato de salida esperado (estrictamente JSON válido):

\`\`\`json
{
  "transcription": "### Conversación\\n**Agente:** Hola, ¿cómo estás?\\n**Cliente:** Bien, gracias.",
  "analysis": {
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

**IMPORTANTE:**
- **Devuelve únicamente el JSON sin texto antes o después.**
- **Si algún dato no se encuentra en la transcripción, usa \`null\` en su lugar.**
- **Todos los valores deben estar bien formateados para que el JSON pueda ser parseado correctamente en JavaScript.**
- **No incluyas comentarios en el JSON.**
- **No incluyas espacios adicionales en el JSON.**
- **No incluyas saltos de línea en los valores de las propiedades.**
- **No incluyas caracteres especiales en los valores de las propiedades.**
- **No incluyas valores booleanos en mayúsculas.**
- **No incluyas comas al final de los objetos o arrays.**
- **No incluyas espacios antes o después de los corchetes o llaves.**
- **No incluyas espacios antes o después de los dos puntos.**

Ahora, aquí tienes la transcripción de la llamada para analizar:

"Transcripción de llamada telefónica:

 ${transcription}"
`;

		if (platform === "openai") {
			const response = await this.openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [{ role: "system", content: prompt }],
				temperature: 0.7,
				response_format: zodResponseFormat(
					TranscriptionSchema,
					"transcription"
				),
			});

			const result = response.choices[0]?.message?.content || "{}";
			return JSON.parse(result.replace(/```json|```/g, "").trim());
		} else {
			const response = await this.replicate.run("deepseek-ai/deepseek-r1", {
				input: {
					prompt,
					temperature: 0.2,
				},
			});

			const responseText = (response as string[]).join("").trim();

			// extract the json object from the response text
			const jsonStart = responseText.indexOf("{");
			const jsonEnd = responseText.lastIndexOf("}");
			const jsonString = responseText.substring(jsonStart, jsonEnd + 1);

			return JSON.parse(jsonString);
		}
	}
}
