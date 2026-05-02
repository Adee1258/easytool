declare module "upscaler" {
  interface UpscalerOptions {
    model?: any
  }
  interface UpscaleOptions {
    output?: "base64" | "tensor"
    patchSize?: number
    padding?: number
    progress?: (progress: number) => void
  }
  class Upscaler {
    constructor(options?: UpscalerOptions)
    upscale(image: string | HTMLImageElement | HTMLCanvasElement, options?: UpscaleOptions): Promise<string>
  }
  export default Upscaler
}

declare module "@upscalerjs/esrgan-slim" {
  const model: any
  export default model
}
