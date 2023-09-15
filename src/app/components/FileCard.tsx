"use client"

import { File } from "@prisma/client";
import { FileIcon, IconType } from 'react-file-icon'
import { AiOutlineDownload } from 'react-icons/ai'
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
          <div className="flex gap-2 items-center">
            <p className="border-r-[1px] border-neutral-400 pr-2">{file.size}</p>
            {file.serverUrl.length > 0 ? (
              <div
                className="flex items-center gap-1 cursor-pointer bg-green-500 py-0.5 px-2 rounded-lg text-neutral-800 "
                onClick={() => window.open(file.serverUrl, '_blank')}
              >
                <AiOutlineDownload size={20} />
                <span>Download</span>
              </div>
            ) : (
              <span>This file was not uploaded.</span>
            )}
          </div>
        </div>
      </div>
      <div className="w-[8%] opacity-0 transition-opacity group-hover:opacity-100 duration-100">
        <FileSettings id={file.id} />
      </div>
    </div>
  );
}

export default FileCard;