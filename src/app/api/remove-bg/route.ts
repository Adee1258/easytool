import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const imageFile = formData.get("image_file") as File

    if (!imageFile) {
      return NextResponse.json({ message: "No image provided" }, { status: 400 })
    }

    // Try remove.bg API first (50 free calls/month)
    const apiKey = process.env.REMOVE_BG_API_KEY

    if (apiKey) {
      const rbFormData = new FormData()
      rbFormData.append("image_file", imageFile)
      rbFormData.append("size", "auto")

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": apiKey },
        body: rbFormData,
      })

      if (response.ok) {
        const buffer = await response.arrayBuffer()
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": "image/png",
            "Content-Disposition": "attachment; filename=removed-bg.png",
          },
        })
      }
    }

    // Fallback: Clipdrop API
    const clipdropKey = process.env.CLIPDROP_API_KEY

    if (clipdropKey) {
      const cdFormData = new FormData()
      cdFormData.append("image_file", imageFile)

      const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
        method: "POST",
        headers: { "x-api-key": clipdropKey },
        body: cdFormData,
      })

      if (response.ok) {
        const buffer = await response.arrayBuffer()
        return new NextResponse(buffer, {
          headers: { "Content-Type": "image/png" },
        })
      }
    }

    // Fallback: Hugging Face BRIA RMBG (free, no key needed)
    const imageBytes = await imageFile.arrayBuffer()
    const base64 = Buffer.from(imageBytes).toString("base64")
    const mimeType = imageFile.type || "image/jpeg"

    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/briaai/RMBG-1.4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.HF_TOKEN ? { Authorization: `Bearer ${process.env.HF_TOKEN}` } : {}),
        },
        body: JSON.stringify({
          inputs: `data:${mimeType};base64,${base64}`,
        }),
      }
    )

    if (hfResponse.ok) {
      const buffer = await hfResponse.arrayBuffer()
      return new NextResponse(buffer, {
        headers: { "Content-Type": "image/png" },
      })
    }

    return NextResponse.json(
      { message: "Background removal service unavailable. Please add API key in environment variables." },
      { status: 503 }
    )
  } catch (error: any) {
    console.error("BG removal error:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

export const config = {
  api: { bodyParser: false },
}
