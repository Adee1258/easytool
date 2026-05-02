import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const replicateToken = process.env.REPLICATE_API_TOKEN
    const hfToken = process.env.HF_TOKEN

    // Convert image to base64
    const imageBytes = await imageFile.arrayBuffer()
    const base64 = Buffer.from(imageBytes).toString("base64")
    const mimeType = imageFile.type || "image/jpeg"
    const dataUrl = `data:${mimeType};base64,${base64}`

    // ── Option 1: Replicate API (Real-ESRGAN official) ──────────────────────
    if (replicateToken) {
      // Create prediction
      const createRes = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${replicateToken}`,
          "Content-Type": "application/json",
          Prefer: "wait=60",
        },
        body: JSON.stringify({
          version: "f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa",
          input: {
            image: dataUrl,
            scale: 4,
            face_enhance: false,
          },
        }),
      })

      if (createRes.ok) {
        const prediction = await createRes.json()

        // If completed immediately
        if (prediction.status === "succeeded" && prediction.output) {
          const imgUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output
          const imgRes = await fetch(imgUrl)
          if (imgRes.ok) {
            const buffer = await imgRes.arrayBuffer()
            return new NextResponse(buffer, {
              headers: { "Content-Type": "image/png" },
            })
          }
        }

        // Poll for result
        if (prediction.id) {
          for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 2000))
            const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
              headers: { Authorization: `Bearer ${replicateToken}` },
            })
            const poll = await pollRes.json()
            if (poll.status === "succeeded" && poll.output) {
              const imgUrl = Array.isArray(poll.output) ? poll.output[0] : poll.output
              const imgRes = await fetch(imgUrl)
              if (imgRes.ok) {
                const buffer = await imgRes.arrayBuffer()
                return new NextResponse(buffer, {
                  headers: { "Content-Type": "image/png" },
                })
              }
            }
            if (poll.status === "failed") break
          }
        }
      }
    }

    // ── Option 2: HuggingFace - caidas/swin2SR (best free model) ───────────
    if (hfToken) {
      const imageBlob = new Blob([imageBytes], { type: mimeType })

      // Try swin2SR - best quality free upscaler on HF
      const models = [
        "caidas/swin2SR-realworld-sr-x4-64-bsrgan-psnr",
        "caidas/swin2SR-classical-sr-x4-64",
        "caidas/swin2SR-compressed-sr-x4-48",
      ]

      for (const model of models) {
        const res = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${hfToken}`,
              "Content-Type": mimeType,
            },
            body: imageBlob,
          }
        )

        if (res.ok) {
          const ct = res.headers.get("content-type") || ""
          if (ct.includes("image")) {
            const buffer = await res.arrayBuffer()
            return new NextResponse(buffer, {
              headers: { "Content-Type": "image/png" },
            })
          }
        }

        // Model loading - wait and retry once
        if (res.status === 503) {
          await new Promise(r => setTimeout(r, 20000))
          const retry = await fetch(
            `https://api-inference.huggingface.co/models/${model}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${hfToken}`,
                "Content-Type": mimeType,
              },
              body: imageBlob,
            }
          )
          if (retry.ok) {
            const ct = retry.headers.get("content-type") || ""
            if (ct.includes("image")) {
              const buffer = await retry.arrayBuffer()
              return new NextResponse(buffer, {
                headers: { "Content-Type": "image/png" },
              })
            }
          }
        }
      }
    }

    return NextResponse.json(
      {
        error: "AI upscaling requires API key. Add REPLICATE_API_TOKEN or HF_TOKEN in Vercel environment variables.",
        setup: {
          replicate: "Get free credits at replicate.com - best quality",
          huggingface: "Get free token at huggingface.co/settings/tokens",
        }
      },
      { status: 503 }
    )
  } catch (error: any) {
    console.error("Upscale error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
