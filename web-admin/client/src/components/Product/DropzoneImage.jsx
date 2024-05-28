// @ts-nocheck
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import update from '../../assets/image/update-avatar.png';

function DropzoneImage({ onSelectedImage, productImage }) {
  const [imageUrl, setImageUrl] = useState(productImage || '');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
      onSelectedImage(file);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''}`}
    >
      <input
        {...getInputProps()}
        accept="image/*"
      />
      {imageUrl ? (
        <div className="flex flex-col">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="preview-image h-[290px] mx-auto"
          />
          <span className="mt-[20px] inline-block border bg-[#f6f6f7] py-2 px-3 rounded-sm text-black text-center">
            Drag and drop or click your image to change it
          </span>
        </div>
      ) : (
        <>
          {isDragActive ? (
            <div className="w-[200px] h-[200px] before:animate-spin before:border-blue-900 flex flex-col relative items-center justify-center mx-auto before:border-[2px] before:border-dashed before:rounded-full before:absolute before:h-[200px] before:w-[200px]">
              <div className="bg-blue-400 opacity-60 rounded-full flex justify-center items-center flex-col h-[200px] w-[200px]">
                <img
                  src={update}
                  alt=""
                  className="mx-auto w-[100px] h-[78px]"
                />
                <span className="text-center">
                  Drag and drop or click your images here
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-[200px] h-[200px] flex flex-col relative items-center justify-center mx-auto before:border-[2px] before:border-dashed before:rounded-full before:absolute before:h-[200px] before:w-[200px]">
                <img
                  src={update}
                  alt=""
                  className="mx-auto w-[100px] h-[78px]"
                />
                <span className="text-center">
                  Drag and drop or click your images here
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DropzoneImage;
