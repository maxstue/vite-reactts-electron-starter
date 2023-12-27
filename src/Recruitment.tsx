import { DarkModeContext } from './context/DarkModeContext';

import React, { useState, useContext } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Search from './components/searchBar';
import ProfileImageUploader from './components/photoUploader';

const Recruitment: React.FC<{ username: string }> = ({ username }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [profileImage, setProfileImage] = useState<string>(''); // State untuk menyimpan URL gambar profil

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

  return (
    <div
      className={`flex pt-10 h-screen overflow-hidden ${
        darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header username={username} />
        <article className="flex-1 p-4 overflow-auto">
          <h2 className="font-extrabold text-2xl mt-2 mb-6 px-4">Add Employee</h2>
          <div
            className={`grid grid-cols-2 rounded max-w-full mx-4 px-8 py-4 shadow-lg ${
              darkMode ? 'bg-gray-800 text-gray-200 shadow-white' : 'bg-white text-gray-800'
            }`}
          >
            <section id="left" className="flex flex-col">
              <h3 className="font-bold text-xl mb-2">General Information</h3>
              <h4 className="text-lg pl-1 mb-1">Image Profile</h4>
              <ProfileImageUploader onSave={handleSaveProfileImage} className="flex justify-center mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <h4 className="text-lg pl-1 mb-1">Name</h4>
              <Search placeholder="Name" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <h4 className="text-lg pl-1 mb-1">Email</h4>
              <Search placeholder="Email" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <h4 className="text-lg pl-1 mb-1">Phone Number</h4>
              <Search placeholder="Phone Number" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <h4 className="text-lg pl-1 mb-1">Gender</h4>
              <span className="flex">
                <fieldset defaultValue={'Male'} className="flex gap-4 text-lg">
                  <label htmlFor="gender1" className="flex gap-2">
                    <input name="gender" type="radio" value="Male" id="Male" defaultChecked />
                    Male
                  </label>
                  <label htmlFor="gender2" className="flex gap-2">
                    <input name="gender" type="radio" value="Female" id="Female" />
                    Female
                  </label>
                </fieldset>
              </span>
            </section>
            <section id="right">
              <h3 className="font-bold text-xl mb-2">Work Information</h3>
              <h4 className="text-lg pl-1 mb-1">ID</h4>
              <Search placeholder="ID" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
            </section>
          </div>
          <div className="mt-6 mr-4 flex flex-row-reverse gap-4">
            <button
              onClick={handleSave}
              className="flex w-20 rounded-lg text-white justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2"
            >
              Save
            </button>
            <button className="flex w-20 rounded-lg text-gray-800 justify-center bg-gray-400 hover:bg-gray-500 px-4 py-2">
              Cancel
            </button>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Recruitment;
