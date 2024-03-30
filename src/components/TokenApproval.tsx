import React, { FC } from 'react';
import image1 from '../public/images/Text.png';
import image2 from '../public/images/profile_1.png';
import TransactionSpeedSlider from './TransactionSpeedSlider';

interface TokenApprovalProps {
  setTokenStep: (step: number) => void;
}

const TokenApproval: FC<TokenApprovalProps> = ({ setTokenStep }) => {
  return (
    <>
      <div className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none custom-scrollbar">
        <div className="rounded-xl bg-white w-[calc(100%-24px)] mx-auto max-w-460 sm:w-full p-4 sm:p-6 max-h-80vh overflow-auto custom-scrollbar">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <button className="flex gap-1.5 text-sm leading-[21px] font-normal items-center " href="#" onClick={() => setTokenStep(prev => prev - 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.99967 12.6666L3.33301 7.99998L7.99967 3.33331" stroke="#252B21" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.6663 8H3.33301" stroke="#252B21" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Go back
              </button>
              <a className="flex gap-0.5 text-sm font-normal items-center text-secondary-color" href="#">
                View Raw
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <h2 className="text-base lg:text-2xl font-semibold  capitalize">Token approval</h2>
            <p className="text-xs font-normal leading-[150%]  opacity-[0.56] capitalize">signing to approve a token transfer</p>
          </div>
          <div className="flex flex-col gap-3 my-6">
            <div className="max-w-[350px] flex flex-col gap-5 bg-yellow-color bg-opacity-25 border-dashed border border-yellow-color rounded-10 py-5 px-4">
              <div className="flex justify-between">
                <h2 className=" opacity-60 text-xs font-normal capitalize">Token Info</h2>
                <a href="#" className=" text-xs font-medium capitalize underline">
                  Edit{' '}
                </a>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xs lg:text-sm font-normal">Approve Token</h2>
                <div className="">
                  <div className="flex gap-1.5 items-center justify-end">
                    <img src={image2} alt="profile" />
                    <h2 className="text-xs lg:text-sm font-medium">115,765,0.. USDC</h2>
                  </div>
                  <h2 className="text-xs leading-4 font-normal  opacity-60 text-right">Balance: 211.987 USDC</h2>
                </div>
              </div>
              <div className="flex justify-between">
                <h2 className=" text-xs lg:text-sm font-normal">Approve To</h2>
                <div>
                  <div className="flex gap-3 items-center justify-end">
                    <h2 className=" text-xs lg:text-sm font-medium text-right">0x0000..8ba3</h2>
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
                  <div className="flex gap-1.5 items-center justify-end mt-2">
                    <img src={image2} alt="profile" />
                    <h2 className=" text-xs leading-4 font-normal">Uniswap permit 2</h2>
                  </div>
                  <div className="flex gap-1.5 items-center justify-end mt-2 mb-3">
                    <img src={image2} alt="profile" />
                    <h2 className=" text-xs leading-4 font-normal">Never interacted before</h2>
                  </div>
                  <a href="#" className=" text-xs leading-4 font-normal underline flex justify-end">
                    View More
                  </a>
                </div>
              </div>
            </div>
            <div className="max-w-[350px] w-full flex flex-col border bg-secondary-color bg-opacity-25 border-dashed border-secondary-color rounded-10 py-5 px-4">
              <h2 className=" text-xs font-normal">Requesting from</h2>
              <div className="flex justify-between mt-5 items-center">
                <p className="text-xs lg:text-sm font-normal  flex items-center">
                  Travsherman.eth{' '}
                  <span className="px-1 pt-[4px]">
                    <img src={image1} />
                  </span>{' '}
                  0x6...c80
                </p>
                <h2 className="text-xs lg:text-sm font-medium ">$741.01</h2>
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
            <h2 className=" text-xs font-medium box-border leading-none px-1.5 ml-[16px] relative bg-white w-[121px] capitalize z-[1]">Simulation Results</h2>
            <div className="border-[1.5px] border-solid rounded-[10px] border-[#959ea740] py-4 px-[22px] relative bottom-1.5">
              <p className="w-[306px] text-secondary-color text-sm font-normal">No Balance Change</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-medium leading-none">Transaction Speed</h2>
              <p className="text-base font-medium leading-none">Fee: $1.50</p>
            </div>
            <div className="max-w-[350px] bg-[#D9D9D9] h-1.5 cursor-pointer">
              {/* <div className="bg-yellow-color h-full w-1/2">
                <svg className="relative bottom-1.5 left-[95%]" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <circle cx="10.6621" cy="10" r="9.5" fill="#EFAC00" stroke="white" />
                </svg>
              </div>
              <h2 className="mt-4 text-center text-xs font-medium leading-none opacity-40">Normal</h2> */}
              <TransactionSpeedSlider />
            </div>
          </div>
          <div className="flex justify-between items-center mt-14 gap-2">
            <button className="w-[225px] h-11 text-white bg-primary-color text-xs lg:text-sm font-medium border border-primary-color rounded-[10px]" onClick={() => setTokenStep(prev => prev + 1)}>
              Submit Now
            </button>
            <button className="w-[115px] h-11  text-xs lg:text-sm font-medium border border-primary-color rounded-10" onClick={() => setTokenStep(prev => (prev = 0))}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{' '}
    </>
  );
};

export default TokenApproval;