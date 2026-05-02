import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const imageFile = formData.get("image") as File
    const scale = parseInt(formData.get("scale") as string || "4")

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const imageBytes = await imageFile.arrayBuffer()
    const base64 = Buffer.from(imageBytes).toString("base64")
    const mimeType = imageFile.type || "image/jpeg"

    // Try Real-ESRGAN via Hugging Face Inference API
    // Model: ai-forever/Real-ESRGAN - 4x upscaling
    const hfToken = process.env.HF_TOKEN

    const response = await fetch(
      "https://api-inference.huggingface.co/models/ai-forever/Real-ESRGAN",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(hfToken ? { Authorization: `Bearer ${hfToken}` } : {}),
        },
        body: JSON.stringify({
          inputs: `data:${mimeType};base64,${base64}`,
        }),
      }
    )

    if (response.ok) {
      const contentType = response.headers.get("content-type") || "image/png"
      const buffer = await response.arrayBuffer()
      return new NextResponse(buffer, {
        headers: { "Content-Type": contentType },
      })
    }

    // Fallback: replicate.com free tier (no key needed for some models)
    const replicateResponse = await fetch(
      "https://api-inference.huggingface.co/models/philz1337x/clarity-upscaler",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(hfToken ? { Authorization: `Bearer ${hfToken}` } : {}),
        },
        body: JSON.stringify({
          inputs: `data:${mimeType};base64,${base64}`,
        }),
      }
    )

    if (replicateResponse.ok) {
      const buffer = await replicateResponse.arrayBuffer()
      return new NextResponse(buffer, {
        headers: { "Content-Type": "image/png" },
      })
    }

    return NextResponse.json(
      { error: "Upscaling service unavailable. Add HF_TOKEN to environment variables for best results." },
      { status: 503 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
