import React, { FC, useContext, useState, useEffect } from 'react';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Context } from '../context/AppContext';
import { auth, db } from '../firebase';
import Error from '../pages/Error';
import { collection, getDocs } from 'firebase/firestore';

interface Profile {
  name: string;
  linkTo: string;
}

// eslint-disable-next-line react/function-component-definition
const Header: FC = () => {
  const { profileList } = useContext(Context); // Accessing profileList from context
  const [show, setShow] = useState<boolean>(false); // State for dropdown visibility
  const [showProfile, setShowProfile] = useState<boolean>(false); // State for profile dropdown visibility
  const [authUser, setAuthUser] = useState(null);
  let isDappLanched;
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        navigate("/register");
        setAuthUser(null);
      }
    });

    // async function getDappToggle() {
    //   isDappLanched = await window.electronAPI.queryViewVisibility();
    // }
    // getDappToggle();
    // if (isDappLanched) {
    //   window.electronAPI.toggleBrowserView();
    // }

    return () => {
      listen();
    };
  }, []);

  const handleNavigation = async (path, params): void => {
    const walletInfoSnapshot = await getDocs(collection(db, `Users/${authUser.email}/wInfo`));
    let userAddress;
    let userPKey;
    let userWalletName;

    // Query initial state
    const isVisible = await window.electronAPI.queryViewVisibility();

    if (isVisible) {
      window.electronAPI.toggleBrowserView();
    }

    walletInfoSnapshot.forEach((doc) => {
      userAddress = doc.data().wAddress;
      userPKey = doc.data().wPKey;
      userWalletName = doc.data().wName;
    });
    console.log(userPKey);
    if (path === '/unlockwallet' && params === '/wallet') {
      navigate({
        pathname: path,
        search: createSearchParams({
          userEmail: authUser.email || '',
          userAddress: userAddress || '',
          userPKey: userPKey || '',
          userWalletName: userWalletName || '',
          pageToUnlock: '/wallet'
        }).toString()
      });
    }
    navigate({
      pathname: path,
      search: createSearchParams({
        userEmail: authUser.email || '',
        userAddress: userAddress || '',
        userPKey: userPKey || '',
        userWalletName: userWalletName || '',
        walletUnlocked: false || ''
      }).toString()
    });
  };

  return (
    <div className="border border-b border-border-color border-opacity-75 bg-white">
      {authUser !== null ? (
        <header className="container max-w-1440 mx-auto py-5 px-4 lg:pl-12 lg:pr-7 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo-img.png" alt="dapphub" />
            <span className="font-medium text-base lg:text-lg">Dapphub</span>
          </Link>
          <div className="flex justify-between items-center">
            {/* <div className="profile-count relative md:mr-4">
              {/* Profile count and dropdown */}
            {/* {isDappLanched ? (
                <button
                  onClick={() => window.electronAPI.toggleBrowserView()}
                  className="border py-1 px-4 text-sm md:text-base font-semibold rounded-md"
                >
                  {1}
                </button>
              ) : (
                <button className="border py-1 px-2 text-sm md:text-base font-semibold rounded-sm">
                  {0}
                </button>
              )}
              {/* Profile dropdown */}
            {/* {profileList.length > 0 ? (
                <ul
                  className={`absolute top-full mt-2 bg-primary-bg left-0 right-0 w-full border shadow-sm p-2 min-w-20 ${
                    showProfile ? '' : 'hidden'
                  }`}
                >
                  {profileList.map((profile: Profile) => {
                    return (
                      <li key={profile.name}>
                        <Link to={profile.linkTo}>{profile.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null} */}
            {/* </div> */}
            <svg
              className="hidden md:block"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11.0185 2.66751C7.98437 2.66751 5.51854 5.13334 5.51854 8.16751V10.8167C5.51854 11.3758 5.2802 12.2283 4.99604 12.705L3.94187 14.4558C3.29104 15.5375 3.7402 16.7383 4.93187 17.1417C8.8827 18.4617 13.1452 18.4617 17.096 17.1417C18.2052 16.775 18.691 15.4642 18.086 14.4558L17.0319 12.705C16.7569 12.2283 16.5185 11.3758 16.5185 10.8167V8.16751C16.5185 5.14251 14.0435 2.66751 11.0185 2.66751Z"
                stroke="#1A1C1E"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M12.7139 2.93332C12.4298 2.85082 12.1364 2.78665 11.8339 2.74999C10.9539 2.63999 10.1106 2.70415 9.32227 2.93332C9.5881 2.25499 10.2481 1.77832 11.0181 1.77832C11.7881 1.77832 12.4481 2.25499 12.7139 2.93332Z"
                stroke="#1A1C1E"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.7686 17.4717C13.7686 18.9842 12.5311 20.2217 11.0186 20.2217C10.2669 20.2217 9.57022 19.91 9.07522 19.415C8.58022 18.92 8.26855 18.2233 8.26855 17.4717"
                stroke="#1A1C1E"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
            <svg
              className="mx-4"
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="22"
              viewBox="0 0 2 22"
              fill="none"
            >
              <path opacity="0.1" d="M1 0L0.999999 22" stroke="#1A1C1E" />
            </svg>
            <div className="flex items-center relative cursor-pointer" onClick={() => setShow((prev) => !prev)}>
              <img src="/images/avatar.png" className="w-7 h-7 rounded-full" alt="profile" />
              <p className="text-[#1A1C1E] text-base leading-none font-medium ml-2 mr-3">{authUser.email}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M10.4534 4.77167H6.81926H3.54676C2.98676 4.77167 2.70676 5.44833 3.10343 5.845L6.1251 8.86667C6.60926 9.35083 7.39676 9.35083 7.88093 8.86667L9.0301 7.7175L10.9026 5.845C11.2934 5.44833 11.0134 4.77167 10.4534 4.77167Z"
                  fill="#1A1C1E"
                />
              </svg>
              <div
                className={`absolute top-full bg-primary-bg left-0 right-0 w-full border shadow-sm p-2 ${
                  show ? '' : 'hidden'
                }`}
              >
                <ul>
                  <li>
                    <p onClick={() => handleNavigation('/unlockwallet', '/wallet')}>Wallet</p>
                  </li>
                  <li>
                    <p onClick={() => handleNavigation('/explore-dapps')}>Explore</p>
                  </li>
                  <li>
                    <p onClick={() => handleNavigation('/home')}>Profile</p>
                  </li>
                  <li>
                    <p onClick={() => window.electronAPI.toggleBrowserView()}>Toggle Dapp View</p>
                  </li>
                  <li>
                    <p onClick={() => handleNavigation('/register')}>Sign out</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Header;
