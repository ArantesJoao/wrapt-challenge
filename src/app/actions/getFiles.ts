import prisma from "@/app/libs/prismadb"

export default async function getFiles() {
  return await prisma.file.findMany()
}
