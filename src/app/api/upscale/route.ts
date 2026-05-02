import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const hfToken = process.env.HF_TOKEN

    if (!hfToken) {
      return NextResponse.json(
        { error: "HF_TOKEN not configured" },
        { status: 503 }
      )
    }

    // Convert image to blob for HF API
    const imageBytes = await imageFile.arrayBuffer()
    const imageBlob = new Blob([imageBytes], { type: imageFile.type || "image/jpeg" })

    // Real-ESRGAN 4x upscaling - correct HF model
    // This model accepts raw image bytes (not base64 JSON)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/caidas/swin2SR-realworld-sr-x4-64-bsrgan-psnr",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": imageFile.type || "image/jpeg",
        },
        body: imageBlob,
      }
    )

    if (response.ok) {
      const buffer = await response.arrayBuffer()
      const contentType = response.headers.get("content-type") || "image/png"
      return new NextResponse(buffer, {
        headers: { "Content-Type": contentType },
      })
    }

    // Log the error for debugging
    const errText = await response.text().catch(() => "unknown")
    console.error("HF API error:", response.status, errText)

    // Fallback model: ESRGAN
    const fallbackResponse = await fetch(
      "https://api-inference.huggingface.co/models/eugenesiow/super-image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": imageFile.type || "image/jpeg",
        },
        body: imageBlob,
      }
    )

    if (fallbackResponse.ok) {
      const buffer = await fallbackResponse.arrayBuffer()
      return new NextResponse(buffer, {
        headers: { "Content-Type": "image/png" },
      })
    }

    // Second fallback: stabilityai upscaler
    const stability = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-x4-upscaler",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: Buffer.from(imageBytes).toString("base64") }),
      }
    )

    if (stability.ok) {
      const buffer = await stability.arrayBuffer()
      return new NextResponse(buffer, {
        headers: { "Content-Type": "image/png" },
      })
    }

    return NextResponse.json(
      { error: `AI upscaling failed (${response.status}). The model may be loading, please try again in 30 seconds.` },
      { status: 503 }
    )
  } catch (error: any) {
    console.error("Upscale route error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
