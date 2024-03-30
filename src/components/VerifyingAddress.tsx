import React, { FC } from 'react';
import image1 from '../public/images/Text.png';
import image2 from '../public/images/profile_1.png';

interface VerifyingAddressProps {
  setTokenStep: (step: number) => void;
}

const VerifyingAddress: FC<VerifyingAddressProps> = ({ setTokenStep }) => {
  return (
    <>
      <div className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none custom-scrollbar">
        <div className="rounded-xl bg-white w-[calc(100%-24px)] mx-auto max-w-460 sm:w-full p-4 sm:p-6 max-h-80vh overflow-auto custom-scrollbar">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <a className="flex gap-1.5 text-sm font-normal items-center " href="#" onClick={() => setTokenStep(0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.99967 12.6666L3.33301 7.99998L7.99967 3.33331" stroke="#252B21" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.6663 8H3.33301" stroke="#252B21" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Go back
              </a>
              <a className="flex gap-[3px] text-sm font-normal items-center text-[#767676]" href="#">
                View Raw
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <h2 className="text-base lg:text-2xl font-semibold  capitalize">Verifying Address</h2>
            <p className="text-xs font-normal leading-[150%]  opacity-[0.56] capitalize">dapphub.io wants you to sign in with your Ethereum</p>
          </div>
          <div className="flex flex-col gap-3 mt-[25px] mb-5">
            <div className="w-[350px] flex flex-col gap-5 bg-[#efac000f] border-dashed border border-yellow-color rounded-[10px] py-5 px-[18px]">
              <h2 className=" opacity-60 text-xs  font-normal capitalize">Dapp Info</h2>
              <div className="flex justify-between items-center">
                <h2 className="text-xs md:text-base font-medium">Interact Dapp</h2>
                <div className="flex gap-1.5 items-center">
                  <img src={image2} alt="profile" />
                  <h2 className="text-xs md:text-base font-medium">Dapphub</h2>
                </div>
              </div>
              <div className="flex justify-between">
                <h2 className=" text-xs md:text-base font-normal">Description</h2>
                <p className=" text-xs md:text-base font-medium text-right">
                  You are verifying <br />
                  address On Dapphub
                </p>
              </div>
            </div>
            <div className="w-[350px] flex flex-col border bg-[#959ea70f] border-dashed border-secondary rounded-[10px] py-5 px-[18px]">
              <h2 className=" text-xs  font-normal">Requesting from</h2>
              <div className="flex justify-between mt-5 items-center">
                <p className="text-xs md:text-base font-normal  flex items-center">
                  Travsherman.eth{' '}
                  <span className="px-1 pt-1">
                    <img src={image1} />
                  </span>{' '}
                  0x6...c80
                </p>
                <h2 className="text-xs md:text-base font-medium ">$741.01</h2>
              </div>
              <a className="flex gap-2 mt-3 items-center" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <g clipPath="url(#clip0_113_2244)">
                    <path d="M7.75 1.6875C8.3125 1.125 9.3125 1.125 9.875 1.6875L13.3125 5.125C13.875 5.6875 13.875 6.6875 13.3125 7.25L11 9.5625C10.4375 10.125 9.4375 10.125 8.875 9.5625L5.4375 6.125C4.875 5.5625 4.875 4.5625 5.4375 4L7.75 1.6875Z" stroke="#959EA7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.75 4.375L10.625 6.25" stroke="#959EA7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.875 6.625L1.25 11.25V13.125C1.25 13.5 1.5 13.75 1.875 13.75H4.375V11.875H6.25V10H7.5L8.375 9.125" stroke="#959EA7" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_113_2244">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-secondary text-xs  font-normal">Private key address</p>
              </a>
            </div>
          </div>
          <div>
            <h2 className=" text-xs font-medium box-border leading-none px-1.5 ml-4 relative bg-white w-[61px] capitalize z-[1]">Account</h2>
            <div className="border-[1.5px] border-solid rounded-[10px] border-secondary-color border-opacity-25 py-[18px] px-[22px] relative bottom-1.5 mb-[6.5px]">
              <p className="max-w-[306px] w-full text-secondary text-sm font-normal">0x684Eb5907581005a28856C406DAcA4fBB56a 4C80</p>
            </div>
          </div>
          <div className="mb-3.5">
            <div className="flex justify-between relative z-[1]">
              <h2 className=" text-xs font-medium box-border leading-none px-1.5 ml-4 bg-white w-[149px] capitalize">Sign in with public key</h2>
              <a href="#" className="text-yellow-color text-xs font-medium box-border leading-none px-1.5 mr-4 bg-white w-[42px]">
                Copy
              </a>
            </div>
            <div className="border-[1.5px] border-solid rounded-[10px] border-secondary-color border-opacity-25 py-4 px-5 relative bottom-1.5">
              <p className="max-w-[317px] w-full text-secondary text-sm font-normal">('crv':'P-256', 'ext':true,'key_ ops' ['verify'],'kty':'EC',x':'zkzBDIv9Ss_0xPOzPCt_HYf8a NHPfKOUirDONKx2wQ';'y':'08uLUY67rSe9UJpSMIX DNilQBfWWn60¡NcXoV_EmLGI')</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 mb-6">
            <h2 className=" text-xs  font-normal">Details</h2>
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between">
                <h2 className=" text-xs md:text-base font-normal">URL</h2>
                <p className=" text-xs md:text-base font-medium text-right">https://dapphub.io</p>
              </div>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between">
                <h2 className=" text-xs md:text-base font-normal">Version</h2>
                <p className=" text-xs md:text-base font-medium text-right">1</p>
              </div>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between">
                <h2 className=" text-xs md:text-base font-normal">Chain ID</h2>
                <p className=" text-xs md:text-base font-medium text-right">1</p>
              </div>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between">
                <h2 className=" text-xs md:text-base font-normal">Nonce</h2>
                <p className=" text-xs md:text-base font-medium text-right">SFQvayEpfnFi3H2Gu</p>
              </div>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between">
                <h2 className=" text-xs md:text-base font-normal">Issued At</h2>
                <p className=" text-xs md:text-base font-medium text-right">2024-02-21T17:04:25.1232</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <button className="w-[225px] h-[45px] text-white bg-[#252B21] text-xs md:text-base font-medium border border-[#252B21] rounded-[10px]" onClick={() => setTokenStep(prev => prev + 1)}>
              Submit Now
            </button>
            <button className="w-[115px] h-[45px]  text-xs md:text-base font-medium border border-[#252B21] rounded-[10px]" onClick={() => setTokenStep(prev => (prev = 0))}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default VerifyingAddress;