import { File } from "@prisma/client";
import { FileIcon, IconType } from 'react-file-icon'
import {
  categorizeExtension,
  getColorForCategory
} from '@/utils/propertiesConversions'
import FileSettings from "./FileSettings";

interface FileCardProps {
  file: File
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const fileType = categorizeExtension(file.type) as IconType
  const color = getColorForCategory(fileType)

  return (
    <div
      className="flex justify-between w-full p-2 border-b-[1px] border-neutral-300 hover:bg-neutral-300 group transition duration-100"
    >
      <div className="flex gap-3 w-[92%]">
        <div className="w-10">
          <FileIcon
            type={fileType}
            extension={file.type}
            glyphColor={color}
            labelColor={color}
          />
        </div>
        <div className="w-[90%]">
          <p className="truncate font-semibold">{file.name}</p>
          <p className="">{file.size}</p>
        </div>
      </div>
      <div className="w-[8%] opacity-0 transition-opacity group-hover:opacity-100 duration-100">
        <FileSettings id={file.id} />
      </div>
    </div>
  );
}

export default FileCard;