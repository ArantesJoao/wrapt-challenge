import { File } from "@prisma/client";
import getFiles from "../actions/getFiles";
import EmptyState from "./EmptyState";
import FileCard from "./FileCard";

const UploadedFiles = async () => {
  const files: File[] = await getFiles();

  if (files.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-full flex-wrap my-8 bg-neutral-200 rounded-md">
        {files.map((file: File) => {
          return (
            <FileCard file={file} key={file.id} />
          )
        })}
      </div>
    </div>
  );
}

export default UploadedFiles;