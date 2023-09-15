'use client'

import axios from 'axios';
import { useState } from 'react';
import { BsUpload } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL
} from "firebase/storage"
import { storage } from '@/app/libs/firebaseConfig'
import { Progress } from 'antd';

const UploadButton = () => {
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file: File) => {
    if (file) {
      const storageRef = ref(storage, file.name);

      // Check if file already exists
      try {
        const existingFileURL = await getDownloadURL(storageRef);
        return '';
      } catch (error) {
        // File doesn't exist yet
      }

      const metadata = {
        contentType: file.type,
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setUploadProgress(progress);
          },
          (error) => {
            toast.error(error.message);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
              setUploadProgress(0)
            });
          }
        );
      });
    }
    return '';
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const uploadedUrl = await handleUpload(file);
      setDownloadUrl(uploadedUrl);

      const formData = new FormData();
      formData.set('file', file);
      formData.set('metadata', JSON.stringify({
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        serverUrl: uploadedUrl
      }));

      const res = await axios.post('/api/file', formData)

      if (res.data.success) {
        toast.success(res.data?.message)
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      } else {
        toast.error(res.data?.message)
      }

      setUploading(false);
    }
  };

  return (
    <>
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
      <div
        className={`w-[30%] self-center mt-4 flex flex-col items-center
        ${uploadProgress > 0 ? 'block' : 'hidden'}`}
      >
        <span className="">Firebase upload progress</span>
        <Progress percent={uploadProgress} />
      </div>
    </>
  );
}

export default UploadButton;
