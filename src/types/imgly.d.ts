declare module "@imgly/background-removal" {
  interface RemoveBackgroundConfig {
    progress?: (key: string, current: number, total: number) => void
    output?: {
      format?: "image/png" | "image/jpeg" | "image/webp"
      quality?: number
    }
    model?: "small" | "medium"
    debug?: boolean
  }

  export function removeBackground(
    image: File | Blob | string | ArrayBuffer,
    config?: RemoveBackgroundConfig
  ): Promise<Blob>
}
