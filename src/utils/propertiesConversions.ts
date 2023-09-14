import mime from "mime-types"

export function getExtension(mimeType: string): string | false {
  return mime.extension(mimeType)
}

export function smartSizeConverter(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let unitIndex = 0

  while (bytes >= 1000 && unitIndex < units.length - 1) {
    bytes /= 1024
    unitIndex++
  }

  return Number.isInteger(bytes) || bytes < 10
    ? `${bytes.toFixed(1)} ${units[unitIndex]}`
    : `${bytes.toFixed(2)} ${units[unitIndex]}`
}

export function categorizeExtension(extension: string): string {
  const mimeType = mime.lookup(extension)

  if (!mimeType) return "unknown"

  const categoryMap: { [key: string]: string[] } = {
    "3d": ["x3d", "3ds", "dae", "obj", "blend"],
    acrobat: ["pdf"],
    audio: ["audio", "mp3", "wav", "ogg"],
    binary: ["octet-stream", "apk", "exe", "dll", "class", "so"],
    code: [
      "html",
      "css",
      "javascript",
      "xml",
      "json",
      "java",
      "c",
      "cpp",
      "py",
      "go",
      "rs",
      "rb",
      "cs",
      "php",
    ],
    compressed: ["zip", "rar", "tar", "gz", "bz2", "7z", "xz"],
    document: [
      "plain",
      "rtf",
      "msword",
      "vnd.openxmlformats-officedocument.wordprocessingml",
      "odt",
    ],
    drive: ["disk", "iso"],
    font: ["font", "woff", "woff2", "ttf", "otf", "eot"],
    image: ["image", "png", "jpeg", "gif", "bmp", "webp", "tiff", "svg"],
    presentation: [
      "vnd.ms-powerpoint",
      "vnd.openxmlformats-officedocument.presentationml",
      "odp",
    ],
    settings: ["prefs", "config", "ini", "yaml", "toml"],
    spreadsheet: [
      "vnd.ms-excel",
      "vnd.openxmlformats-officedocument.spreadsheetml",
      "ods",
    ],
    vector: ["svg"],
    video: ["video", "mp4", "mkv", "flv", "avi", "mov", "webm"],
  }

  for (const [category, types] of Object.entries(categoryMap)) {
    if (types.some((type) => mimeType.includes(type))) {
      return category
    }
  }

  return "unknown"
}

export function getColorForCategory(category: string): string {
  const colorMap: { [key: string]: string } = {
    "3d": "#5D6D7E",
    acrobat: "#E74C3C",
    audio: "#3498DB",
    binary: "#BDC3C7",
    code: "#34495E",
    compressed: "#F39C12",
    document: "#ECF0F1",
    drive: "#7F8C8D",
    font: "#2C3E50",
    image: "#8E44AD",
    presentation: "#27AE60",
    settings: "#95A5A6",
    spreadsheet: "#2ECC71",
    vector: "#2980B9",
    video: "#C0392B",
  }

  return colorMap[category] || "unknown"
}
