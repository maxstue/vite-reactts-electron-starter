import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

interface EmployeeDetailModalProps {
  person: any;
  onClose: () => void;
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ person, onClose }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState({ ...person });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Lakukan logika penyimpanan data yang diedit
    // Misalnya, kirim data ke server atau perbarui state di tingkat yang lebih tinggi
    // Setelah selesai penyimpanan, atur kembali isEditing menjadi false
    setIsEditing(false);
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto flex items-center justify-center z-50`}
      style={{ backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }}
    >
      <div
        className={`relative mx-auto max-w-xl p-6 rounded-lg border-2 ${
          darkMode ? 'text-gray-200 bg-gray-800 border-gray-200' : 'text-gray-800 bg-white border-gray-800'
        }`}
      >
        <button
          className={`absolute top-0 right-2 m-4 text-4xl ${darkMode ? 'text-white' : 'text-gray-800'}`}
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col p-8 items-center">
          {/* Tampilkan detail karyawan atau form pengeditan */}
          {isEditing ? (
            <form className="flex flex-col items-start text-gray-800">
              <p className="mb-4">ID : {person.ID} (Can't be changed)</p>
              {/* Tampilkan form pengeditan di sini */}
              <input
                type="text"
                value={editedPerson.name}
                onChange={(e) => setEditedPerson({ ...editedPerson, name: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="email"
                value={editedPerson.email}
                onChange={(e) => setEditedPerson({ ...editedPerson, email: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={editedPerson.phoneNumber}
                onChange={(e) => setEditedPerson({ ...editedPerson, phoneNumber: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={editedPerson.gender}
                onChange={(e) => setEditedPerson({ ...editedPerson, gender: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={editedPerson.department}
                onChange={(e) => setEditedPerson({ ...editedPerson, department: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={editedPerson.role}
                onChange={(e) => setEditedPerson({ ...editedPerson, role: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={editedPerson.status}
                onChange={(e) => setEditedPerson({ ...editedPerson, status: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
            </form>
          ) : (
            <div className="flex flex-col items-center">
              <img className="flex w-40 h-40 rounded-full object-cover mb-8" src={person.image} alt={person.name} />
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold">
                  {person.name} | {person.ID}
                </h2>
                <p>Email: {person.email}</p>
                <p>Phone Number: {person.phoneNumber}</p>
                <p>Gender: {person.gender}</p>
                <p>Department: {person.department}</p>
                <p>Role: {person.role}</p>
                <p>Retirement Status: {person.status}</p>
              </div>
              {/* Tampilkan detail lainnya sesuai kebutuhan */}
            </div>
          )}

          {/* Tampilkan tombol Edit atau Save sesuai dengan kondisi isEditing */}
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleSaveClick}
                className={`p-2 rounded border ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-900 text-white border-white'
                    : 'bg-gray-200 hover:bg-gray-100 text-gray-800 border-gray-800'
                }`}
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`p-2 rounded border ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-900 text-white border-white'
                    : 'bg-gray-200 hover:bg-gray-100 text-gray-800 border-gray-800'
                }`}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className={`mt-4 px-4 py-2 rounded border-2 ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-900 text-white border-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-800'
              }`}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
