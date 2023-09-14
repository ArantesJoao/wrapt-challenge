import UploadButton from "./components/UploadButton";
import UploadedFiles from "./components/UploadedFiles";

export default function Home() {
  return (
    <div className="flex flex-col">
      <UploadButton />
      <UploadedFiles />
    </div>
  )
}
