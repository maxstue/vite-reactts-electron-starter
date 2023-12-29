import React, { useContext, useState } from 'react';
import { DarkModeContext } from './context/DarkModeContext';
import { FaSave } from 'react-icons/fa';
import Header from './components/header';
import Sidebar from './components/sidebar';

import InputText from './components/inputTextField';
import ProfileImageUploader from './components/photoUploader';
import FlashMessage from './components/flashMessage';

const Settings: React.FC<{ initialUsernameProp?: string; onUpdateUsername: (newUsername: string) => void }> = ({
  initialUsernameProp,
  onUpdateUsername
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(initialUsernameProp || 'AdminHR');
  const [profileImage, setProfileImage] = useState<string>('');
  const [flashMessage, setFlashMessage] = useState<React.ReactNode | null>(null);


  const handleSaveData = () => {
    // Logika untuk menyimpan data ke dalam file xlsx
    console.log('Data saved to Excel file');
  };

  const handleSaveProfileImage = (image: string) => {
    // Simpan URL gambar profil ke dalam state
    setProfileImage(image);
  };

  const handleSave = () => {
    // Lakukan operasi penyimpanan sesuai kebutuhan aplikasi
    console.log('Saved profile image:', profileImage);

    // Reset state setelah disimpan (jika perlu)
    // setProfileImage('');
  };

  // const handleErrorFlashMessage = () => {
  //   const message = <FlashMessage type="error" color="#EE393A" message="Salah tuh, bang. Yang benar tuh begini." />;
  //   setFlashMessage(message);

  //   // Setelah 3 detik, hilangkan Flash Message
  //   setTimeout(() => {
  //     setFlashMessage(null);
  //   }, 3000);
  // };

  return (
    <div
      className={`flex pt-8 h-screen overflow-hidden ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header initialUsername={initialUsernameProp} />
        <article className="relative flex-1 ml-2 p-4 overflow-auto">
          {/* Pengaturan Akun User */}
          <section className={`border-2 py-4 px-6 mb-8 rounded-lg ${darkMode ? 'border-white' : 'border-gray-800'}`}>
            <h2 className="font-extrabold text-2xl mb-6">Account Settings</h2>
            <div className="absolute left-1/2 top-20 flex flex-col gap-2 justify-start">
              <label htmlFor="photoProfile" className="block text-lg font-medium pl-1 mb-1">
                Photo Profile
              </label>
              <ProfileImageUploader onSave={handleSaveProfileImage} className="" />
            </div>
            {/* Nama Display */}
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-lg font-medium pl-1 mb-1">
                Display Name
              </label>
              <InputText placeholder="Display Name" type="text" className="mb-4" onUsernameChange={setUsername} />
            </div>
            {/* Email */}
            <div className="mb-24">
              <label htmlFor="email" className="block text-lg font-medium pl-1 mb-1">
                Email
              </label>
              <InputText placeholder="Email" type="email" className="mb-4" />
            </div>
            {/* Ganti Password */}
            <div className="outline outline-offset-4 rounded mb-4 p-4">
              <label htmlFor="currentPassword" className="block text-lg font-medium pl-1 mb-1">
                Current Password
              </label>
              <InputText placeholder="Current Password" type={showPassword ? 'text' : 'password'} className="mb-4" />
              <label htmlFor="newPassword" className="block text-lg font-medium pl-1 mb-1">
                New Password
              </label>
              <InputText placeholder="New Password" type={showPassword ? 'text' : 'password'} className="mb-4" />
              <label htmlFor="retypeNewPassword" className="block text-lg font-medium pl-1 mb-1">
                Retype New Password
              </label>
              <InputText placeholder="Retype New Password" type={showPassword ? 'text' : 'password'} className="mb-4" />
              {/* Tombol untuk melihat/menyembunyikan password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 py-2 rounded text-sm bg-blue-500 hover:bg-blue-600 cursor-pointer mb-2 text-white"
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
            {/* Tombol Simpan Pengaturan Akun User */}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-flex items-center gap-2"
              onClick={() => {
                onUpdateUsername(username);
                handleSave();
                // ... (Tambahkan logika lain jika diperlukan)
              }}
            >
              Save Account Settings
            </button>
          </section>

          {/* Tombol untuk Menyimpan Data ke Excel (xlsx) */}
          <section className={`border-2 py-4 px-6 mb-8 rounded-lg ${darkMode ? 'border-white' : 'border-gray-800'}`}>
            <h2 className="font-extrabold text-2xl mb-6">Export Data</h2>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md inline-flex items-center gap-2 text-white"
              onClick={handleSaveData}
            >
              <FaSave />
              Export to Excel
            </button>
          </section>
          <section className={`border-2 py-4 px-6 mb-8 rounded-lg ${darkMode ? 'border-white' : 'border-gray-800'}`}>
            <h2 className="font-extrabold text-2xl mb-6">Logout</h2>
            <p className="mb-2">You need to logout?</p>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md inline-flex items-center gap-2 text-white"
              onClick={handleSaveData}
            >
              Logout
            </button>
            {/* <button
              type="button"
              className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md inline-flex items-center gap-2 text-white"
              onClick={handleErrorFlashMessage}
            >
              False Test
            </button> */}
          </section>
          {/* Menampilkan Flash Message jika ada */}
          {flashMessage && <div className="z-10 absolute bottom-4 right-4">{flashMessage}</div>}
        </article>
      </main>
    </div>
  );
};

export default Settings;
