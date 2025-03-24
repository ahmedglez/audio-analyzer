import { AIAnalysisService } from "./AIAnalysisService";
import { AITranscriptionService } from "./AITranscriptionService";

export class AIProcessingService {
	private transcriptionService: AITranscriptionService;
	private analysisService: AIAnalysisService;

	constructor(apiKey: string) {
		this.transcriptionService = new AITranscriptionService(apiKey);
		this.analysisService = new AIAnalysisService(apiKey);
	}

	async process(
		file: Blob,
		requirements: string[],
		platform: "openai" | "replicate"
	) {
		const transcription = await this.transcriptionService.transcribe(
			file,
			platform
		);
		return this.analysisService.analyze(
			typeof transcription === "string"
				? transcription
				: JSON.stringify(transcription),
			requirements,
			platform
		);
	}
}
