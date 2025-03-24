import { NextRequest, NextResponse } from "next/server";

import { AIProcessingService } from "@/lib/ai/AIProcessingService";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("audio") as Blob;
		const platform = formData.get("platform") as "openai" | "replicate";
		const apiKey = formData.get("apiKey") as string;
		const requirements = JSON.parse(formData.get("requirements") as string);

		if (!apiKey || !file || !requirements) {
			return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
		}

		const processingService = new AIProcessingService(apiKey);
		const result = await processingService.process(
			file,
			requirements,
			platform
		);

		return NextResponse.json(result);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error en el procesamiento" },
			{ status: 500 }
		);
	}
}
