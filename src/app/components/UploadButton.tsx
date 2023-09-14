'use client'

import axios from 'axios';
import { useState } from 'react';
import { BsUpload } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

const UploadButton = () => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('metadata', JSON.stringify({
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      setUploading(true);

      const res = await axios.post('/api/file', formData)

      if (res.data.success) {
        toast.success(res.data?.message)
        window.location.reload();
      } else {
        toast.error(res.data?.message)
      }

      setUploading(false);
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 py-1.5
       transition-colors duration-200 w-full lg:w-1/4 self-center 
       ${uploading ? 'bg-gray-400' : 'bg-blue-600'}`}
      onClick={() => document.getElementById('fileInput')?.click()}
      disabled={uploading}
    >
      <BsUpload color="white" size={35} />
      <p className="w-fullfont-open-sans font-semibold text-white ">
        Upload file
      </p>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </button>
  );
}

export default UploadButton;
