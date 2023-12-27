import React, { useState } from 'react';

const ProfileImageUploader: React.FC<{ onSave: (image: string) => void; className: string }> = ({
  onSave,
  className
}) => {
  const [image, setImage] = useState<string>(''); // State untuk menyimpan URL gambar
  const [preview, setPreview] = useState<string>(''); // State untuk menampilkan pratinjau gambar
  const [isUploading, setIsUploading] = useState<boolean>(false); // State untuk menandakan proses upload

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validasi tipe file, misalnya hanya menerima gambar
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImage(reader.result as string);
          setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
      } else {
        // Tipe file tidak sesuai, reset input
        e.target.value = '';
        alert('Please choose a valid image file.');
      }
    }
  };

  const handleSave = () => {
    setIsUploading(true);
    // Simpan URL gambar ke dalam state parent atau lakukan pengiriman ke backend
    onSave(image);
    // Reset state setelah disimpan
    setIsUploading(false);
  };

  const handleRemove = () => {
    // Hapus gambar
    setImage('');
    setPreview('');
  };

  return (
    <div className={`${className}`}>
      <label htmlFor="imageInput" style={{ position: 'relative', display: 'inline-block' }}>
        <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        {preview ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: '200px', maxHeight: '100%', borderRadius: '50%', overflow: 'hidden' }}
            />
            {image && (
              <div style={{ top: 0, right: 0 }}>
                <button onClick={handleRemove}>Remove</button>
              </div>
            )}
          </div>
        ) : (
          <label
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#ccc',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '24px', color: '#fff' }}>+</span>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        )}
        {image && !isUploading && (
          <div>
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </label>
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default ProfileImageUploader;
