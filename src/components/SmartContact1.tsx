import React, { useState } from 'react';
import image1 from '../../public/images/Text.png';
import image2 from '../../public/images/profile_1.png';
import ReactSlider from 'react-slider';

const SmartContact1: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="box-border m-0 p-0 h-screen">
              <section className="flex justify-center">
                <div className="rounded-[14px] bg-white w-[400px] p-[25px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <a className="flex gap-[6px] text-sm leading-[21px] font-normal items-center text-[#252B21]" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M7.99967 12.6666L3.33301 7.99998L7.99967 3.33331" stroke="#252B21" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12.6663 8H3.33301" stroke="#252B21" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Go back
                      </a>
                      <a className="flex gap-[3px] text-sm leading-[21px] font-normal items-center text-[#767676]" href="#">
                        View Raw
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 12L10 8L6 4" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                    <h2 className="text-2xl leading-9 font-semibold text-[#252B21] capitalize">sign pulse transaction</h2>
                    <p className="text-[13px] font-normal leading-[19.5px] text-[#252B21] opacity-[0.56] capitalize">Suspendisse a purus eget sem maximus porttitor. Aliquam porttitor sed nunc eu sagittis.</p>
                  </div>
                  <div className="flex flex-col gap-3 mt-[25px] mb-[25px]">
                    <div className="w-[350px] flex flex-col gap-5 bg-[#efac000f] border-dashed border border-[#EFAC00] rounded-[10px] py-5 px-[18px]">
                      <h2 className="text-[#252B21] opacity-60 text-[13px] leading-[19.5px] font-normal capitalize">Info</h2>
                      <div className="flex justify-between">
                        <h2 className="text-[#252B21] text-[15px] leading-[22.5px] font-normal">Interact Contract</h2>
                        <div>
                          <div className="flex gap-3 items-center justify-end">
                            <h2 className="text-[#252B21] text-[15px] leading-[22.5px] font-medium text-right">0x9ee2...14c7</h2>
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
                          <div className="flex gap-[6px] items-center justify-end mt-2 mb-3">
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
                            <h2 className="text-[#252B21] text-xs leading-[18px] font-normal">Never interacted before</h2>
                          </div>
                          <a href="#" className="text-[#252B21] text-xs leading-[18px] font-normal underline flex justify-end">
                            View More
                          </a>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-[15px] leading-[22.5px] font-normal">Operation</h2>
                        <p className="text-[15px] leading-[22.5px] font-medium text-right">Stake</p>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-[15px] leading-[22.5px] font-normal">Pay PLS</h2>
                        <p className="text-[15px] leading-[22.5px] font-medium text-right">10,000 PLS</p>
                      </div>
                    </div>
                    <div className="w-[350px] flex flex-col border bg-[#959ea70f] border-dashed border-[#959EA7] rounded-[10px] py-5 px-[18px]">
                      <h2 className="text-[#252B21] text-[13px] leading-[19.5px] font-normal">Requesting from</h2>
                      <div className="flex justify-between mt-5 items-center">
                        <p className="text-[15px] leading-[22.5px] font-normal text-[#252B21] flex items-center">
                          Travsherman.eth{' '}
                          <span className="px-1 pt-[4px]">
                            <img src={image1} />
                          </span>{' '}
                          0x6...c80
                        </p>
                        <h2 className="text-[15px] leading-[22.5px] font-medium text-[#252B21]">$741.01</h2>
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
                        <p className="text-[#959EA7] text-[13px] leading-[19.5px] font-normal">Private key address</p>
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <h2 className="text-[#252B21] text-[13px] font-medium box-border leading-none px-1.5 ml-[16px] relative bg-white capitalize z-[1]">Simulation Results</h2>
                      <p className="text-[#959EA7] text-[13px] leading-none font-medium px-1.5 mr-[16px] relative bg-white capitalize z-[1]">- $1.32</p>
                    </div>
                    <div className="border-[1.5px] border-solid rounded-[10px] border-[#959ea740] py-[18px] px-[22px] relative bottom-[5.5px] flex justify-between">
                      <p className="text-[#252B21] text-[15px] leading-[22.5px] font-normal">Token Out</p>
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex gap-[6px] items-center justify-end">
                          <img src={image2} alt="profile" />
                          <h2 className="text-[#EF0000] text-[15px] leading-[22.5px] font-medium">- 10,000.0000 PLS</h2>
                        </div>
                        <h2 className="text-[#252B21] text-[13px] leading-[19.5px] font-normal text-right">= $1.32</h2>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex justify-between items-center mb-[19px]">
                      <h2 className="text-base font-medium leading-none">Transaction Speed</h2>
                      <p className="text-base font-medium leading-none">Fee: $1.50</p>
                    </div>
                    <div className="w-[350px] bg-[#D9D9D9] h-[8px] cursor-pointer">
                      <div className="">
                        <ReactSlider className="horizontal-slider h-1.5" thumbClassName="price-thumb" trackClassName="price-track" renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>} />
                      </div>
                      <h2 className="mt-4 text-center text-[#252B21] text-xs font-medium leading-none opacity-40">Normal</h2>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-[59px]">
                    <button className="w-[225px] h-[45px] text-white bg-[#252B21] text-[15px] leading-[22.5px] font-medium border border-[#252B21] rounded-[10px]">Sign & Create</button>
                    <button onClick={() => setShowModal(false)} className="w-[115px] h-[45px] text-[#252B21] text-[15px] leading-[22.5px] font-medium border border-[#252B21] rounded-[10px]">
                      Cancel
                    </button>
                  </div>
                </div>
              </section>
            </div>
            ;
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default SmartContact1;