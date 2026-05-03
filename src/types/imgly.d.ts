declare module "@imgly/background-removal" {
  interface RemoveBackgroundConfig {
    publicPath?: string
    progress?: (key: string, current: number, total: number) => void
    output?: {
      format?: "image/png" | "image/jpeg" | "image/webp"
      quality?: number
    }
    model?: "isnet" | "isnet_fp16" | "isnet_quint8"
    debug?: boolean
  }

  export function removeBackground(
    image: File | Blob | string | ArrayBuffer,
    config?: RemoveBackgroundConfig
  ): Promise<Blob>
}
