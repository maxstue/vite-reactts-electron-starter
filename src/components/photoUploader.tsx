import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import FlashMessage from './flashMessage';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2;

const ProfileImageUploader: React.FC<{
  onSave: (image: string) => void;
  className: string;
}> = ({ onSave, className }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [image, setImage] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [flashMessageErrorInput, setFlashMessageErrorInput] = useState<string>('');
  const [showFlashMessageSuccess, setShowFlashMessageSuccess] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validasi tipe dan ukuran file
      if (ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImage(reader.result as string);
          setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
      } else {
        // Tipe atau ukuran file tidak sesuai
        e.target.value = '';
        setFlashMessageErrorInput('Please choose a valid image file (JPEG, PNG, or GIF) with size up to 2MB.');

        // Setel ulang flashMessage setelah beberapa waktu
        setTimeout(() => {
          setFlashMessageErrorInput('');
        }, 3000);
      }
    }
  };

  const handleRemove = () => {
    // Konfirmasi sebelum menghapus
    const shouldRemove = window.confirm('Are you sure you want to remove the image?');

    if (shouldRemove) {
      // Hapus gambar
      setImage('');
      setPreview('');
      setFlashMessageErrorInput('');
      setShowFlashMessageSuccess('Penghapusan berhasil');

      // Setel ulang flashMessage success setelah beberapa waktu
      setTimeout(() => {
        setShowFlashMessageSuccess('');
      }, 3000);
    }
  };

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <label htmlFor="imageInput" style={{ position: 'relative', display: 'inline-block' }}>
        <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        {preview ? (
          <div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  border: darkMode ? '2px solid #fff' : '2px solid #000'
                }}
              >
                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        ) : (
          <label
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#ccc',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
              border: darkMode ? '2px solid #fff' : '2px solid #000'
            }}
          >
            <svg
              className="w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </label>
      {preview && image && (
        <>
          <button
            className={`focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${
              darkMode ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-900' : 'bg-purple-700 hover:bg-purple-800'
            }`}
            onClick={handleRemove}
          >
            Remove
          </button>
        </>
      )}
      {flashMessageErrorInput && (
        <div className="z-10 absolute bottom-4 right-4">
          <FlashMessage type="warning" message={flashMessageErrorInput} />
        </div>
      )}
      {/* Menampilkan pesan flash success setelah penghapusan gambar berhasil */}
      {showFlashMessageSuccess && (
        <div className="z-10 absolute bottom-4 right-4">
          <FlashMessage type="success" message={showFlashMessageSuccess} />
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;
