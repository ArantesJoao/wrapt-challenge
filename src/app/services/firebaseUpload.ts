import toast from "react-hot-toast"

export const handleUpload = (imageFile: any) => {
  if (imageFile) {
  } else {
    toast.error("No file was found")
  }
}
