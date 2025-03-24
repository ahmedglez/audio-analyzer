import OpenAI from "openai";
import Replicate from "replicate";

export class AITranscriptionService {
	private openai: OpenAI;
	private replicate: Replicate;

	constructor(apiKey: string) {
		this.openai = new OpenAI({ apiKey });
		this.replicate = new Replicate({ auth: apiKey });
	}

	async transcribe(file: Blob, platform: "openai" | "replicate") {
		const audioFile = new File([file], "audio.mp3", { type: "audio/mpeg" });

		if (platform === "openai") {
			const response = await this.openai.audio.transcriptions.create({
				file: audioFile,
				model: "whisper-1",
				language: "es",
			});
			return response.text;
		} else {
			interface Chunk {
				text: string;
			}

			const transcription = (await this.replicate.run(
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
			)) as { chunks: Chunk[] };

			const text = transcription.chunks.map((chunk) => chunk.text).join(" ");
			return text;
		}
	}
}
