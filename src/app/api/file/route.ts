import prisma from "@/app/libs/prismadb"
import { FileMetadata } from "@/app/types"
import { smartSizeConverter, getExtension } from "@/utils/propertiesConversions"

import { mkdir, writeFile, access, constants } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const metadata = data.get("metadata") as string
  const file = data.get("file") as File

  if (!file)
    return NextResponse.json({ success: false, message: "No file was found!" })

  const buffer = Buffer.from(await file.arrayBuffer())
  const directoryPath = "C:/temp"
  const filePath = `${directoryPath}/${file.name}`

  await mkdir(directoryPath, { recursive: true })

  try {
    await access(filePath, constants.F_OK)
    return NextResponse.json({
      success: false,
      message: "This file already exists in your temp folder! No-op performed.",
    })
  } catch (err) {
    await writeFile(filePath, buffer)
    const parsedMetadata = JSON.parse(metadata) as FileMetadata

    await prisma.file.create({
      data: {
        name: parsedMetadata.name,
        size: smartSizeConverter(parsedMetadata.size),
        type: getExtension(parsedMetadata.type) as string,
        serverUrl: parsedMetadata.serverUrl,
        path: filePath,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Your file was uploaded to your C:/temp folder!",
    })
  }
}
