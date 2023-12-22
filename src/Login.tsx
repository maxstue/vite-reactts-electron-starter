import React, { useState, useEffect, useContext } from 'react';
import ToggleDarkMode from './components/toggleDarkMode';
import { DarkModeContext } from './context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const authenticateUser = async (email: string, password: string) => {
  // Lakukan panggilan API atau autentikasi sesuai kebutuhan
  // Mengembalikan objek pengguna jika berhasil, atau null jika gagal
  return [
    { id: 1, email: 'user@example.com', password: 'password123' },
    { id: 2, email: 'anotheruser@example.com', password: 'securepassword' },
    { id: 3, email: 'user@user.com', password: 'user' },
    { id: 4, email: 'daniel.stonford10@gmail.com', password: '123456' }
    // ... tambahkan data pengguna lain sesuai kebutuhan
  ];
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useAuth();

  // Perbarui useEffect untuk menavigasi ke /dashboard jika sudah terautentikasi
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Panggil fungsi autentikasi
      const user = await authenticateUser(email, password);

      if (user) {
        // Login berhasil, ubah status autentikasi dan redirect
        login();
        navigate('/dashboard');
        setError('');
      } else {
        setError('Email atau password tidak valid');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('Terjadi kesalahan saat melakukan autentikasi');
    }
  };

  const handleForgot = () => {
    navigate('/forgot');
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
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold">K3PCHR</h1>
        <form className="flex flex-col w-full gap-4" onSubmit={handleLogin}>
          <label className="text-md font-bold" htmlFor="email">
            Email
          </label>
          <input
            className={`w-full rounded-lg border-2 border-gray-400 text-sm px-4 py-2 text-gray-800`}
            type="email"
            placeholder="Masukan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex flex-row items-end justify-between pr-1">
            <label className="text-md font-bold" htmlFor="password">
              Password
            </label>
            <button onClick={handleForgot}>
              <p className="text-xs text-blue-500 underline italic">Forgot?</p>
            </button>
          </div>
          <div className={`flex items-center`}>
            <input
              className={`w-full rounded-lg border-2 border-gray-400 text-sm px-4 py-2 text-gray-800`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 focus:outline-none">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full mt-6 rounded-lg text-white bg-blue-500 hover:bg-blue-600 px-4 py-2" type="submit">
            Login
          </button>
        </form>
      </main>
      <div className="absolute top-16 right-10">
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default Login;
