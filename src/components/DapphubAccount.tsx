/* eslint-disable no-param-reassign */
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { doc, collection, addDoc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { auth, db } from '../firebase';

interface DapphubAccountProps {
  handleSubmit: (event: FormEvent) => void;
  walletName: string;
  setWalletName: (email: string) => void;
  walletPin: string;
  setWalletPin: (password: string) => void;
  walletNameError: string;
  walletPinError: string;
  validateWalletName: () => void;
  validatePin: () => void;
}

// eslint-disable-next-line react/function-component-definition
const DapphubAccount: FC<DapphubAccountProps> = ({
  handleSubmit,
  walletName,
  setWalletName,
  walletPin,
  setWalletPin,
  walletNameError,
  walletPinError,
  validateWalletName,
  validatePin
}) => {
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('userEmail');
  const navigate = useNavigate();

  const signUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const api = axios.create({
      //  baseURL: 'https://dapphub-backend-apis.fly.dev',
      // baseURL: 'http://localhost:8080',
      baseURL: 'https://dapphub-account-provider.fly.dev',
      withCredentials: true
    });

    const obj = {
      password: walletPin,
      email: userEmail
    };

    await api.post('/createWallet', obj).then((response) => {
      if (response.status === 200) {
        const data = collection(db, `Users/${userEmail}/wInfo`);
        addDoc(data, {})
          .then((docRef) => {
            setDoc(doc(data, walletName), {
              wName: walletName,
              wAddress: response.data.address,
              wPKey: response.data.encryptedPrivateKey
            }).catch((error) => {
              console.log(error);
            });

            deleteDoc(doc(db, `Users/${userEmail}/wInfo`, docRef.id));
          })
          .catch((error) => {
            console.log(error);
          });

        navigate({
          pathname: '/home',
          search: createSearchParams({
            userEmail: userEmail || '',
            userAddres: response.data.address,
            userPKey: response.data.encryptedPrivateKey,
            userWalletName: walletName
          }).toString()
        });
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
        <strong>Create Your Dapphub Account (DA)</strong>
      </h2>
      {/* <p className="text-xs mt-3">Let’s get started by providing the details!</p> */}
      <form action="#" className="flex flex-col gap-7 mt-12" onSubmit={handleSubmit}>
        <div className="relative">
          <label
            className="absolute left-4 p-1 -top-3.5 font-medium text-xs lg:text-sm bg-primary-bg z-10"
            htmlFor="email"
          >
            Wallet Name
          </label>
          <input
            className="px-5 py-3 w-full border bg-opacity-25 border-secondary-color border-opacity-25 rounded-10 placeholder:text-sm bg-primary-bg placeholder:text-secondary-color"
            type="name"
            value={walletName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWalletName(e.target.value)}
            onBlur={validateWalletName}
            name="walletName"
            id="walletName"
            placeholder="Your first wallet name under your Dapphub Account"
          />
          <span className="error text-red-600">{walletNameError}</span>
        </div>
        <div className="relative">
          <label
            className="absolute left-4 p-1 -top-3.5 font-medium text-xs lg:text-sm bg-primary-bg z-10"
            htmlFor="password"
          >
            Pin
          </label>
          <input
            className="px-5 py-3 w-full border bg-opacity-25 border-secondary-color border-opacity-25 rounded-10 placeholder:text-sm bg-primary-bg placeholder:text-secondary-color"
            type="password"
            value={walletPin}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWalletPin(e.target.value)}
            onBlur={validatePin}
            name="pin"
            id="pin"
            placeholder="Your pin to access your Dapphub Account"
          />
          <span className="error text-red-600">{walletPinError}</span>
        </div>
        <button
          type="submit"
          className="text-base font-medium text-white bg-primary-button border border-white border-opacity-10 rounded-10 px-10 py-4 flex justify-center gap-2.5 hover:bg-opacity-90"
          onClick={signUp}
        >
          Finish
        </button>
      </form>
    </div>
  );
};

export default DapphubAccount;
