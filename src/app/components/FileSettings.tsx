"use client"

import { AiOutlineClose, AiFillEdit, AiOutlineCheck } from 'react-icons/ai'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface FileSettingsProps {
  id: String
}

const FileSettings: React.FC<FileSettingsProps> = ({ id }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputName, setInputName] = useState('');

  const handleDelete = async () => {
    axios.delete(`/api/file/${id}`)
      .then(() => {
        toast.success("File deleted!")
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
  }

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleConfirmEdit = async () => {
    const data = { id, inputName }
    await axios.put(`/api/file/${id}`, data).then(() => {
      toast.success("File updated!")
      window.location.reload();
    })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setModalOpen(false);
        setInputName('')
      })
  };

  return (
    <div className="flex justify-end gap-2 items-center h-full">
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleEditClick();
        }}
        className="bg-green-700 hover:bg-green-800 transition p-1 rounded-lg cursor-pointer"
      >
        <AiFillEdit color="white" />
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="bg-red-600 hover:bg-red-700 transition p-1 rounded-lg cursor-pointer"
      >
        <AiOutlineClose color="white" />
      </div>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex bg-black bg-opacity-30 items-center transition"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute flex flex-col bg-white p-4 rounded h-[10%] justify-center transform -translate-x-1/2 top-40 left-1/2"
          >
            <h2 className='mb-2'>
              Edit File Name
            </h2>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={inputName}
                onChange={handleInputChange}
                className="border p-1 rounded"
                placeholder="Enter new name"
              />
              <button
                onClick={handleConfirmEdit}
                className="bg-blue-500 rounded-lg p-1"
              >
                <AiOutlineCheck size={24} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileSettings;





