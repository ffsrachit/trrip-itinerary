import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import API from '../utils/api';
import toast from 'react-hot-toast';

const UploadSection = ({ onSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file first!');

    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);

    try {
      await API.post('/itinerary/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Itinerary generated successfully!');
      setFile(null);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Travel Document</h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
      >
        <input {...getInputProps()} />
        <p className="text-4xl mb-3">📄</p>
        {isDragActive ? (
          <p className="text-indigo-600 font-semibold">Drop it here!</p>
        ) : (
          <>
            <p className="text-gray-600 font-semibold">Drag & drop your travel document</p>
            <p className="text-gray-400 text-sm mt-1">or click to browse</p>
            <p className="text-gray-400 text-xs mt-2">Supports PDF, JPG, PNG (max 10MB)</p>
          </>
        )}
      </div>

      {file && (
        <div className="mt-4 flex items-center justify-between bg-indigo-50 px-4 py-3 rounded-lg">
          <span className="text-indigo-700 font-medium">📎 {file.name}</span>
          <button onClick={() => setFile(null)} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {uploading ? '⏳ Generating Itinerary...' : '🚀 Generate Itinerary'}
      </button>
    </div>
  );
};

export default UploadSection;