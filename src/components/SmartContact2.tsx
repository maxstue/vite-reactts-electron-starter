import React, { FC } from 'react';
import TransactionSpeedSlider from './TransactionSpeedSlider';
import image1 from '../public/images/Text.png';
import image2 from '../public/images/profile_1.png';

interface SmartContact2Props {
  setTokenStep: (step: number) => void;
}

const SmartContact2: FC<SmartContact2Props> = ({ setTokenStep }) => {
  return (
    <>
      <div className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none custom-scrollbar">
        <div className="rounded-xl bg-white w-[calc(100%-24px)] mx-auto max-w-460 sm:w-full p-4 sm:p-6 max-h-80vh overflow-auto custom-scrollbar">
          <div className="flex flex-col gap-3">
            <h2 className="text-base md:text-2xl leading-none font-semibold  capitalize">sign pulse transaction</h2>
            <p className="text-xs font-normal  opacity-[0.56] capitalize">Suspendisse a purus eget sem maximus porttitor. Aliquam porttitor sed nunc eu sagittis.</p>
          </div>
          <div className="flex flex-col gap-3 my-6">
            <div className="flex flex-col gap-5 bg-yellow-color bg-opacity-25 border-dashed border border-y-yellow-color rounded-10 py-5 px-4">
              <h2 className=" opacity-60 text-xs font-normal capitalize">Info</h2>
              <div className="flex justify-between">
                <h2 className=" text-xs md:text-sm font-normal">Interact Contract</h2>
                <div>
                  <div className="flex gap-3 items-center justify-end">
                    <h2 className=" text-xs md:text-sm font-medium text-right">0x9ee2...14c7</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <g clipPath="url(#clip0_113_1750)">
                        <path d="M12.5 5H6.25C5.55964 5 5 5.55964 5 6.25V12.5C5 13.1904 5.55964 13.75 6.25 13.75H12.5C13.1904 13.75 13.75 13.1904 13.75 12.5V6.25C13.75 5.55964 13.1904 5 12.5 5Z" stroke="#252B21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 10C1.8125 10 1.25 9.4375 1.25 8.75V2.5C1.25 1.8125 1.8125 1.25 2.5 1.25H8.75C9.4375 1.25 10 1.8125 10 2.5" stroke="#252B21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_113_1750">
                          <rect width="15" height="15" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex gap-1.5 items-center justify-end mt-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clipPath="url(#clip0_113_2315)">
                        <path d="M7.99967 14.6666C11.6816 14.6666 14.6663 11.6818 14.6663 7.99992C14.6663 4.31802 11.6816 1.33325 7.99967 1.33325C4.31778 1.33325 1.33301 4.31802 1.33301 7.99992C1.33301 11.6818 4.31778 14.6666 7.99967 14.6666Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 6L6 10" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L10 10" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_113_2315">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <h2 className=" text-xs  font-normal">Never interacted before</h2>
                  </div>
                  <a href="#" className=" text-xs  font-normal underline flex justify-end">
                    View More
                  </a>
                </div>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xs md:text-sm font-normal">Operation</h2>
                <p className="text-xs md:text-sm font-medium text-right">Unstake</p>
              </div>
            </div>
            <div className="flex flex-col border bg-primary-color bg-opacity-25 border-dashed border-secondary-color rounded-10 py-5 px-4">
              <h2 className=" text-xs font-normal">Requesting from</h2>
              <div className="flex justify-between mt-5 items-center">
                <p className="text-xs md:text-sm font-normal  flex items-center">
                  Travsherman.eth{' '}
                  <span className="px-1 pt-1">
                    <img src={image1} />
                  </span>{' '}
                  0x6...c80
                </p>
                <h2 className="text-xs md:text-sm font-medium ">$741.01</h2>
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
                <p className="text-secondary-color text-xs font-normal">Private key address</p>
              </a>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h2 className=" text-xs font-medium box-border leading-none px-1.5 ml-[16px] relative bg-white capitalize z-[1]">Simulation Results</h2>
              <p className="text-secondary-color text-xs leading-none font-medium px-1.5 mr-[16px] relative bg-white capitalize z-[1]">+ $1.32</p>
            </div>
            <div className="border-[1.5px] border-solid rounded-10 border-secondary-color border-opacity-25 py-4 px-5 relative bottom-[5.5px] flex justify-between">
              <p className=" text-xs md:text-sm font-normal">Token In</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1.5 items-center justify-end">
                  <img src={image2} alt="profile" />
                  <h2 className="text-[#28C193] text-xs md:text-sm font-medium">+ 10,000.0000 PLS</h2>
                </div>
                <h2 className=" text-xs font-normal text-right">= $1.32</h2>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center mb-[19px]">
              <h2 className="text-base font-medium leading-none">Transaction Speed</h2>
              <p className="text-base font-medium leading-none">Fee: $1.50</p>
            </div>
            <div className="bg-[#D9D9D9] h-1.5 cursor-pointer">
              {/* <div className="bg-yellow-color h-full w-[50%]">
                <svg className="relative bottom-1.5 left-[95%]" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <circle cx="10.6621" cy="10" r="9.5" fill="#EFAC00" stroke="white" />
                </svg>
              </div>
              <h2 className="mt-4 text-center  text-xs font-medium leading-none opacity-40">Normal</h2> */}
              <TransactionSpeedSlider />
            </div>
          </div>
          <div className="flex justify-between items-center mt-14 gap-2">
            <button className="w-[225px] h-11 text-white bg-primary-color text-xs md:text-sm font-medium border border-primary-color rounded-10" onClick={() => setTokenStep(prev => prev + 1)}>
              Sign & Create
            </button>
            <button className="w-[115px] h-11  text-xs md:text-sm font-medium border border-primary-color rounded-10" onClick={() => setTokenStep(prev => (prev = 0))}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SmartContact2;