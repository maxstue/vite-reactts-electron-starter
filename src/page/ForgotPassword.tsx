import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleDarkMode from '../components/toggleDarkMode';
import { DarkModeContext } from '../context/DarkModeContext';

const ForgotPassword: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    // Logika untuk mengirim kode ke email
    console.log('Mengirim kode ke email:', email);
    // Set isCodeSent menjadi true untuk menampilkan input kode
    setIsCodeSent(true);
  };

  const handleResetPassword = () => {
    // Logika untuk mereset password
    if (newPassword !== confirmPassword) {
      setError('Password tidak sesuai dengan konfirmasi password.');
    } else {
      setError('');
      // Lakukan reset password atau tindakan lainnya di sini
      console.log('Mereset password untuk email:', email);
    }
  };

  const handleBackLogin = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className={`flex h-screen ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
    >
      <main
        className={`flex flex-col w-96 h-auto items-center justify-center px-8 py-12 rounded-xl shadow-lg drop-shadow-xl gap-5 ${
          darkMode ? 'bg-gray-900 shadow-white' : 'bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold">Reset Password</h1>
        {!isCodeSent ? (
          <>
            <form className="flex flex-col w-full gap-4">
              <label className="text-md font-bold" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-lg border-2 border-gray-400 text-sm px-4 py-2 text-gray-800"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="w-full mt-6 rounded-lg text-white bg-blue-500 hover:bg-blue-600 px-4 py-2"
                onClick={handleSendCode}
              >
                Kirim Kode
              </button>
            </form>
          </>
        ) : (
          <>
            <form className="flex flex-col w-full gap-4">
              <label className="text-md font-bold" htmlFor="resetCode">
                Kode Verifikasi
              </label>
              <input
                className="w-full rounded-lg border-2 border-gray-400 text-sm px-4 py-2 text-gray-800"
                type="text"
                placeholder="Masukkan kode verifikasi"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />

              <label className="text-md font-bold" htmlFor="newPassword">
                Kata Sandi Baru
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-lg border-2 border-gray-400 text-sm px-4 py-2 text-gray-800"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 focus:outline-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <label className="text-md font-bold" htmlFor="confirmPassword">
                Konfirmasi Kata Sandi
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-lg border-2 border-gray-400 text-sm px-4 py-2 text-gray-800"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Konfirmasi kata sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 focus:outline-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                className="w-full mt-6 rounded-lg text-white bg-blue-500 hover:bg-blue-600 px-4 py-2"
                onClick={() => {
                  handleResetPassword;
                  handleBackLogin;
                }}
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </main>
      <div className="absolute top-16 right-10">
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default ForgotPassword;
