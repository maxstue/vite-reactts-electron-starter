import { DarkModeContext } from './context/DarkModeContext';

import React, { useState, useContext } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import InputText from './components/inputTextField';
import ProfileImageUploader from './components/photoUploader';
import SliderChoice from './components/sliderChoice';

const Recruitment: React.FC<{ initialUsername?: string }> = ({ initialUsername }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [profileImage, setProfileImage] = useState<string>(''); // State untuk menyimpan URL gambar profil
  const [, setSelectedGender] = useState<string>('Male');
  const [, setSelectedRetirement] = useState<string>('Yes, already');

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    // Lakukan sesuatu dengan nilai gender yang telah diubah
    console.log('Selected gender:', gender);
  };

  const handleRetirementChange = (retirement: string) => {
    setSelectedRetirement(retirement);
    // Lakukan sesuatu dengan nilai gender yang telah diubah
    console.log('Selected retirement status:', retirement);
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

  return (
    <div
      className={`flex pt-8 h-screen overflow-hidden ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header initialUsername={initialUsername} />
        <article className="flex-1 p-4 overflow-auto">
          <h2 className="font-extrabold text-2xl mt-2 mb-6 px-4">Add Employee</h2>
          <div
            className={`grid grid-cols-2 gap-8 rounded max-w-full mx-4 px-8 py-8 border-2 ${
              darkMode ? 'bg-gray-800 text-white border-white' : 'bg-white text-gray-800 border-gray-800'
            }`}
          >
            <section id="left" className="flex flex-col">
              <h3 className="font-bold text-xl mb-2">General Information</h3>
              <label className="block text-lg font-medium pl-1 mb-1">Image Profile</label>
              <ProfileImageUploader
                onSave={(image) => {
                  console.log('Berhasil');
                }}
                className="flex justify-center mb-4"
              />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <label className="block text-lg font-medium pl-1 mb-1">Name</label>
              <InputText placeholder="Name" type="text" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <label className="block text-lg font-medium pl-1 mb-1">Email</label>
              <InputText placeholder="Email" type="text" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <label className="block text-lg font-medium pl-1 mb-1">Phone Number</label>
              <InputText placeholder="Phone Number" type="text" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <label className="block text-lg font-medium pl-1 mb-1">Gender</label>
              <SliderChoice options={['Male', 'Female']} initialValue="Male" onChange={handleGenderChange} />
            </section>
            <section id="right">
              <h3 className="font-bold text-xl mb-2">Work Information</h3>
              <label className="block text-lg font-medium pl-1 mb-1">ID</label>
              <InputText placeholder="ID" type="text" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <label className="block text-lg font-medium pl-1 mb-1">Department</label>
              <InputText placeholder="Department" type="text" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <label className="block text-lg font-medium pl-1 mb-1">Position</label>
              <InputText placeholder="Position" type="text" className="mb-4" />
              <div id="separator-y" className="flex-grow border-t border-gray-400" />
              <label className="block text-lg font-medium pl-1 mb-1">Retirement?</label>
              <SliderChoice
                options={['Yes, already', 'No, still active']}
                initialValue="Yes, already"
                onChange={handleRetirementChange}
              />
            </section>
          </div>
          <div className="mt-6 mr-4 flex flex-row-reverse gap-4">
            <button
              onClick={handleSave}
              className="flex w-20 rounded-lg text-white justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 border border-blue-600"
            >
              Save
            </button>
            <button className="flex w-20 rounded-lg text-gray-800 justify-center bg-gray-300 hover:bg-gray-500 px-4 py-2 border border-gray-800">
              Cancel
            </button>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Recruitment;
