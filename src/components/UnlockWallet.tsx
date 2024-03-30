/* eslint-disable no-param-reassign */
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { doc, collection, addDoc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { auth, db } from '../firebase';

interface UnlockWalletProps {}

// eslint-disable-next-line react/function-component-definition
const UnlockWallet: FC<UnlockWalletProps> = () => {
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('userEmail');
  const userAddress = searchParams.get('userAddress');
  const userPKey = searchParams.get('userPKey');
  const userWalletName = searchParams.get('userWalletName');
  const pageToUnlock = searchParams.get('pageToUnlock');

  const navigate = useNavigate();
  const [walletPin, setWalletPin] = useState<string>(''); // State for password input
  const [walletPinError, setWalletPinError] = useState<string>(''); // State for password error message

  // Function to validate password
  const validatePin = (): boolean => {
    if (walletPin.length < 8 || walletPin.length > 20) {
      setWalletPinError('Password must be between 8 and 20 characters');
      return false;
    }
    setWalletPinError('');
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isPinValid: boolean = validatePin();
  };

  // console.log(path);

  const unlock = async () => {
    const api = axios.create({
      //  baseURL: 'https://dapphub-backend-apis.fly.dev',
      // baseURL: 'http://localhost:8080',
      baseURL: 'https://dapphub-account-provider.fly.dev',
      withCredentials: true
    });

    const obj = {
      encryptedPrivateKey: userPKey,
      password: walletPin,
      email: userEmail
    };

    await api.post('/getWallet', obj).then((response) => {
      if (response.status === 200) {
        if (pageToUnlock === '/home') {
          window.Main.setPrivateKey(response.data.decryptedPrivateKey);
          navigate({
            pathname: '/home',
            search: createSearchParams({
              userEmail: userEmail || '',
              userAddress: response.data.address,
              userWalletName: userWalletName || '',
              walletUnlocked: true
            }).toString()
          });
        } else {
          navigate({
            pathname: '/wallet',
            search: createSearchParams({
              userEmail: userEmail || '',
              userAddress: response.data.address,
              userPKey: response.data.decryptedPrivateKey,
              userWalletName: userWalletName || '',
              walletUnlocked: true
            }).toString()
          });
        }
      } else {
        setWalletPin('');
        setWalletPinError('Pin did not work');
      }
    });
  };

  return (
    <div className="pt-12 pb-6 xl:pb-8 xl:pt-24 mx-auto w-full md:max-w-sm xl:max-w-full xl:w-1/3 px-5 xl:px-10">
      <div className="flex gap-3 text-lg font-semibold relative">
        <img src="/images/logo-img.png" alt="logo-img" />
        <h2 className="cursor-pointer">Dapphub</h2>
        {/* <ul className="absolute top-full bg-white rounded-sm left-10">
          {nameList.map(name => (
            <li key={name} onClick={() => handleName(name)} className={`border-b p-2 cursor-pointer ${show ? '' : 'hidden'}`}>
              {name}
            </li>
          ))}
        </ul> */}
      </div>
      <h2 className="text-xl lg:text-2xl font-SF-Display-Bold font-semibold mt-12">
        <strong>Enter your Pin/Passphrase to Unlock Your Dapphub Account</strong>
      </h2>
      {/* <p className="text-xs mt-3">Let’s get started by providing the details!</p> */}
      <form action="#" className="flex flex-col gap-7 mt-12" onSubmit={handleSubmit}>
        <div className="relative">
          <label
            className="absolute left-4 p-1 -top-3.5 font-medium text-xs lg:text-sm bg-primary-bg z-10"
            htmlFor="email"
          >
            Pin
          </label>
          <input
            className="px-5 py-3 w-full border bg-opacity-25 border-secondary-color border-opacity-25 rounded-10 placeholder:text-sm bg-primary-bg placeholder:text-secondary-color"
            type="name"
            value={walletPin}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWalletPin(e.target.value)}
            onBlur={validatePin}
            name="walletName"
            id="walletName"
            placeholder="Your Pin/Passphrase"
          />
          <span className="error text-red-600">{walletPinError}</span>
        </div>
        <button
          type="submit"
          className="text-base font-medium text-white bg-primary-button border border-white border-opacity-10 rounded-10 px-10 py-4 flex justify-center gap-2.5 hover:bg-opacity-90"
          onClick={() => {
            unlock();
          }}
        >
          Unlock
        </button>
      </form>
    </div>
  );
};

export default UnlockWallet;
