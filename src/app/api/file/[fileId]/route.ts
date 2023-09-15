import prisma from "@/app/libs/prismadb"
import { storage } from "@/app/libs/firebaseConfig"
import { ref, deleteObject } from "firebase/storage"

import { NextRequest, NextResponse } from "next/server"

import fs from "fs"
import path from "path"

interface IParams {
  fileId?: string
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: IParams }
) {
  const { fileId } = params

  if (!fileId || typeof fileId !== "string") {
    throw new Error("Invalid ID")
  }

  const fileToDelete = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  })

  if (!fileToDelete) {
    throw new Error("File not found!")
  }

  const folderPath = "C:/temp"
  if (fs.existsSync(folderPath)) {
    const filePath = path.join(folderPath, fileToDelete.name)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  // Delete from Firebase Storage
  const storageRef = ref(storage, fileToDelete.name)
  try {
    await deleteObject(storageRef)
  } catch (error) {
    // File doesn't exist
  }

  const file = await prisma.file.deleteMany({
    where: {
      id: fileId,
    },
  })

  return NextResponse.json(file)
}

export async function PUT(req: NextRequest, { params }: { params: IParams }) {
  const { fileId } = params
  const data = await req.json()

  var newName = data.inputName

  const fileToUpdate = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  })

  if (!fileToUpdate) {
    throw new Error("File not found!")
  }

  const extension = path.extname(fileToUpdate.name)
  const newFileNameWithExtension = `${newName}${extension}`

  const folderPath = "C:/temp"
  if (fs.existsSync(folderPath)) {
    const filePath = path.join(folderPath, fileToUpdate.name)
    if (fs.existsSync(filePath)) {
      const newFilePath = path.join(folderPath, newFileNameWithExtension)
      fs.renameSync(filePath, newFilePath)
    }
  }

  const updatedFile = await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      name: newFileNameWithExtension,
    },
  })

  return NextResponse.json(updatedFile)
}
