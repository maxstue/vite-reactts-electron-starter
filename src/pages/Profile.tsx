/* eslint-disable react/jsx-no-useless-fragment */
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import UnlockWallet from '../components/UnlockWallet';
import axios from 'axios';
import DapphubAccount from '../components/DapphubAccount';

interface Item {
  id: string | number;
  title: string;
  description: string;
  launched: boolean;
  launchedAt: string;
  avatar: string;
}

// eslint-disable-next-line react/function-component-definition
const Profile: FC = () => {
  const [userDapps, setUserDapps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('userEmail');
  const userAddress = searchParams.get('userAddress');
  const userPKey = searchParams.get('userPKey');
  const userWalletName = searchParams.get('userWalletName');
  const walletUnlockedByUser = searchParams.get('walletUnlocked');
  const [isViewVisible, setViewVisible] = useState(false);

  const navigate = useNavigate();
  const getUserDapps = async () => {
    const usersDapps = await getDocs(collection(db, `Users/${userEmail}/dapps`));
    const dapps = [];

    usersDapps.forEach((doc) => {
      dapps.push(doc.data());
    });

    setUserDapps(dapps);
  };

  const [show, setShow] = useState<string | number>('');

  // delete handler for the listed home
  const handleDelete = (id): void => {
    deleteDoc(doc(db, `Users/${userEmail}/dapps`, id)).catch((error) => {
      console.error('Error deleting DApp from profile: ', error);
    });
    setUserDapps((prev) => prev.filter((list) => list.docId !== id));
    setShow('');
  };

  // home list show handler
  const handleShow = (id: string | number): void => {
    if (id === show) {
      setShow('');
    } else {
      setShow(id);
    }
  };
  const [dappUrl, setDappUrl] = useState('');
  const [dappLaunched, setDappLaunched] = useState(false);
  const [walletUnlocked, setWalletUnlocked] = useState(walletUnlockedByUser || false);
  const [decryptedPK, setDecryptedPK] = useState('');

  function shortenString(str: string, maxLength: number, useEllipsis = true): string {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + (useEllipsis ? '...' : '');
  }

  const handleNavigation = (): void => {
    navigate({
      pathname: '/explore-dapps',
      search: createSearchParams({
        userEmail: userEmail || ''
      }).toString()
    });
  };

  const sendUrlToMainProcess = (url: string) => {
    window.Main.sendMessage(url);
  };

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
        setDecryptedPK(response.data.decryptedPrivateKey);
        setWalletUnlocked(true);
      } else {
        setWalletPin('');
        setWalletPinError('Pin did not work');
      }
    });
  };

  const sendDataToPreload = () => {
    console.log('Sending data to preload script', decryptedPK, userAddress);
    const privateKey = decryptedPK;
    window.electronAPI.sendUserData({ userAddress, privateKey });
  };

  useEffect(() => {
    window.Main.on('message', (message: string) => {
      setDappUrl(message);
      setDappLaunched(true);
    });
    sendDataToPreload();
    getUserDapps();
    // Handler for visibility changes
    const handleVisibilityChange = (_, isVisible) => {
      setViewVisible(isVisible);
    };

    // Listen for changes
    window.electronAPI.onVisibilityChanged(handleVisibilityChange);

    // Query initial state
    (async () => {
      const isVisible = await window.electronAPI.queryViewVisibility();
      setViewVisible(isVisible);
    })();

    // Cleanup
    return () => {
      window.electronAPI.removeVisibilityChangedListener(handleVisibilityChange);
    };
  }, [walletUnlocked]);

  if (walletUnlocked) {
    window.electronAPI.createBrowserWindow(dappUrl);
  }

  return (
    <section className="container max-w-1440 mx-auto px-4">
      {userDapps.length === 0 ? (
        <>
          <div className="border-[1.5px] outline-dashed outline-yellow-color rounded-14 bg-yellow-color bg-opacity-10 w-[282px] h-[198px] px-6 py-7 mt-12 flex flex-col items-center text-center mx-auto sm:ml-0">
            <button onClick={handleNavigation}>
              <img src="/images/plus.png" alt="plus" />
            </button>
            <h1 className="text-primary-color text-xl md:text-2xl font-medium capitalize">Welcome</h1>
            <p className="text-primary-color opacity-60 text-base font-medium capitalize">
              nothing yet, click the plus icon to get started with dapphub
            </p>
          </div>
          <section>
            {/* <h2 className="text-primary-color text-xl md:text-2xl font-medium capitalize mt-12 mb-6">
              Suggested dapps
            </h2> */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {items.map((item: Item) => {
                return (
                  <div className="bg-white rounded-xl border-black border border-opacity-10" key={item.id}>
                    <Link to={`/blur-profile/${item.id}`}>
                      <img className="w-full" src={item.cover} alt="black-jack" />
                    </Link>
                    <div className="px-4 pt-4 pb-7">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium">{item.title}</h2>
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M6.99996 1.16667L8.80246 4.81834L12.8333 5.40751L9.91663 8.24834L10.605 12.2617L6.99996 10.3658L3.39496 12.2617L4.08329 8.24834L1.16663 5.40751L5.19746 4.81834L6.99996 1.16667Z"
                              fill="#EFAC00"
                              stroke="#DB980A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-xs font-semibold">{item.rating}</p>
                        </div>
                      </div>
                      <p className="text-yellow-color text-sm font-normal">{item.category}</p>
                    </div>
                  </div>
                );
              })}
            </div> */}
          </section>
        </>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {dappLaunched !== true && !isViewVisible ? (
            // tis should only take over the profile page not the all the other screens
            <>
              <h2 className="text-2xl font-semibold mt-10">
                <b>Dashboard Overview</b>
              </h2>
              <div className="flex flex-row gap-3.5 mt-7 flex-wrap">
                <div className="flex w-[203px] h-[267px] py-6 px-5 flex-col justify-center items-center gap-5 shrink-0 rounded-xl border border-dashed border-yellow-color bg-[#efac000f]">
                  <div className="bg-yellow-color w-9 h-9 rounded-full flex justify-center items-center">
                    <button onClick={handleNavigation}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                        <path
                          d="M4.25 9H14.75"
                          stroke="#252B21"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 3.75V14.25"
                          stroke="#252B21"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <h2 className="text-base md:text-lg font-medium text-center capitalize">Add More</h2>
                </div>

                {userDapps.map((dapp) => (
                  <div
                    key={dapp.docId}
                    className=" w-full sm:w-[250px] h-[267px] p-5 flex-col justify-between shrink-0 rounded-xl bg-white"
                  >
                    <div>
                      <div className="flex justify-between relative">
                        <img
                          src={dapp.logo}
                          alt={`${dapp.name}'s logo`}
                          className="h-12 w-12 object-cover rounded-full"
                        />

                        <svg
                          onClick={() => handleShow(dapp.docId)}
                          className="cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99999C10.8332 9.53975 10.4601 9.16666 9.99984 9.16666C9.5396 9.16666 9.1665 9.53975 9.1665 9.99999C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
                            fill="#767676"
                            stroke="#767676"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.99984 5.00001C10.4601 5.00001 10.8332 4.62691 10.8332 4.16668C10.8332 3.70644 10.4601 3.33334 9.99984 3.33334C9.5396 3.33334 9.1665 3.70644 9.1665 4.16668C9.1665 4.62691 9.5396 5.00001 9.99984 5.00001Z"
                            fill="#767676"
                            stroke="#767676"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.99984 16.6667C10.4601 16.6667 10.8332 16.2936 10.8332 15.8333C10.8332 15.3731 10.4601 15 9.99984 15C9.5396 15 9.1665 15.3731 9.1665 15.8333C9.1665 16.2936 9.5396 16.6667 9.99984 16.6667Z"
                            fill="#767676"
                            stroke="#767676"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <button
                          onClick={() => handleDelete(dapp.docId)}
                          className={`absolute top-6 bg-white shadow-sm border rounded-sm right-0 border-b p-2 cursor-pointer ${
                            show === dapp.docId ? '' : 'hidden'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                      <div>
                        <div className="flex gap-2 mt-4 items-center">
                          <h2 className="text-lg font-medium">{dapp.name}</h2>
                        </div>
                        <p className="opacity-60 text-xs md:text-sm font-medium mt-3">
                          {shortenString(dapp.description, 45)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      <div className="flex justify-between items-center">
                        {/* <h2 className="text-secondary-color text-sm  font-normal capitalize">Chain</h2>
                        <p className="text-offColor text-sm  font-medium capitalize">{dapp.chain}</p> */}
                      </div>
                      {dapp.launched ? (
                        <button className="h-8 w-full rounded-lg border border-primary-color text-xs md:text-sm font-normal">
                          Resume
                        </button>
                      ) : (
                        <button
                          onClick={() => sendUrlToMainProcess(dapp.url)}
                          className="h-8 w-full rounded-lg bg-yellow-color text-xs md:text-sm font-normal"
                        >
                          Launch
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {walletUnlocked !== true ? (
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
                    <strong>Enter your Pin/Passphrase to Connect your Dapphub Account to website.</strong>
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
              ) : (
                <div id="dapp-container" style={{ height: 'auto', overflow: 'auto' }}>
                  {/* {dappLaunched && (
                    // <iframe
                    //   preload="/electron/preload.ts"
                    //   title="Dapphub"
                    //   src={dappUrl}
                    //   style={{ width: '100%', height: '800px' }}
                    // />
                  )} */}
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
