import React, { useState, FC } from 'react';
import profile from '/images/profile.png';
import arrow from '/images/downarrow.png';
import cross from '/images/cross2.png';
import TransactionSpeedSlider from './TransactionSpeedSlider';

interface SendTokenProps {
  setStep: (step: number) => void;
}

const SendToken: FC<SendTokenProps> = ({ setStep }) => {
  const [show, setShow] = useState<boolean>(false); // State for dropdown visibility
  const [balance, setBalance] = useState<number>(1751.87); // State for balance
  const balanceList: string[] = ['1751.87', '1251.87']; // List of balance options

  // Function to set balance
  function getBalance(balance: number): void {
    setBalance(balance);
  }

  return (
    <>
      <div className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none custom-scrollbar">
        <div className="rounded-xl bg-white mx-auto max-w-460 w-full p-4 sm:p-6 max-h-80vh overflow-auto custom-scrollbar">
          <div className="flex justify-between items-center">
            {/* Modal title and close button */}
            <h2 className="text-base lg:text-2xl font-semibold capitalize">transaction confirmation</h2>
            <button className="p-3 border rounded-full bg-white" onClick={() => setStep(0)}>
              <img src={cross} width={17} height={15} />
            </button>
          </div>
          {/* Transaction details */}
          <div className="flex flex-col items-center justify-center my-6">
            <h1 className="text-2xl md:text-4xl font-bold">$100.00</h1>
            <p className="text-xs md:text-sm text-secondary">incl. fees (- POL 111.688/ -$100.00) </p>
          </div>
          <div>
            <h2 className="text-sm lg:text-base font-medium my-4">Payment Source:</h2>
            {/* Payment source details */}
            <div className="border-[1.5px] border-solid rounded-10 border-secondary-color border-opacity-20 px-2 py-4 md:p-4 relative bottom-1.5 flex justify-between shadow-md">
              <div className="flex items-center gap-1 md:gap-3">
                <img src={profile} width={45} height={36} />
                <div>
                  <h4 className="text-sm lg:text-base font-medium">Blurr Artwork</h4>
                  <p className="text-secondary text-xs">XYZ....4xq</p>
                </div>
              </div>
              {/* Balance dropdown */}
              <div className="flex items-center relative cursor-pointer" onClick={() => setShow(prev => !prev)}>
                <p className="text-secondary text-xs leading-none font-medium ml-2 mr-3">Balance: ${balance.toLocaleString()}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.4534 4.77167H6.81926H3.54676C2.98676 4.77167 2.70676 5.44833 3.10343 5.845L6.1251 8.86667C6.60926 9.35083 7.39676 9.35083 7.88093 8.86667L9.0301 7.7175L10.9026 5.845C11.2934 5.44833 11.0134 4.77167 10.4534 4.77167Z" fill="#1A1C1E" />
                </svg>
                {/* Balance options */}
                <div className={`absolute top-full mt-4 z-50 bg-primary-bg left-0 right-0 w-full border shadow-sm p-2 ${show ? '' : 'hidden'}`}>
                  <ul>
                    {balanceList.map(balance => {
                      return (
                        <li key={balance}>
                          <span onClick={() => getBalance(parseFloat(balance))}>{balance}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center relative my-6">
            <div className="p-2 rounded-full border z-10 bg-white">
              <img src={arrow} width={30} />
            </div>
            <span className="border border-solid w-full absolute z-0" />
          </div>
          {/* Recept section  */}
          <div>
            <h2 className="text-sm lg:text-base font-medium my-4">Recipient</h2>
            <div className="border-[1.5px] border-solid rounded-10 border-secondary-color border-opacity-20 p-4 relative bottom-1.5 flex gap-3 shadow-md">
              <div className="flex items-center gap-1 md:gap-3">
                <img src={profile} width={45} height={36} />
                <div>
                  <h4 className="text-sm lg:text-base font-medium">Blurr Artwork</h4>
                  <p className="text-secondary text-xs">XYZ....4xq</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {/* transaction cost */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-medium leading-none">Transaction Speed</h2>
              <p className="text-base font-medium leading-none">Fee: $1.50</p>
            </div>
            <div className="w-full bg-[#D9D9D9] h-1.5 cursor-pointer">
              {/* Transaction Slider */}
              <TransactionSpeedSlider />
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 mt-14">
            <p className="text-sm w-[150px] text-secondary-color">You are paying $100.00 to Blurr Artwork</p>
            <button className="w-[115px] h-[40px] bg-yellow-color text-xs md:text-sm font-medium border rounded-10" onClick={() => setStep(prev => prev + 1)}>
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SendToken;