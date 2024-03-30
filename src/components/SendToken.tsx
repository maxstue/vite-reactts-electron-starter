/* eslint-disable react/function-component-definition */
import React, { useState, FC, ChangeEvent, useEffect } from 'react';
import profile from '../public/images/avatar.png';
import arrow from '../public/images/downarrow.png';
import cross from '../public/images/cross2.png';
import TransactionSpeedSlider from './TransactionSpeedSlider';
import axios from 'axios';
import { ethers } from 'ethers';

interface SendTokenProps {
  setStep: (step: number) => void;
  address: string;
  balance: string;
}
const etherscanApiKey = 'JCR88HEE12A3QDZM4EVJUH28ZFVIUFJU88';
const basescanApiKey = '6KUVZZH9STIU2D2XFUXC6QVSCNXB2EK2M4';
const polygonscanApiKey = 'HKJBA5EX2SRFPHCVQRQ4MVDE23PWJ51SFM';
const gasApis = {
  ethereum: `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanApiKey}`,
  bsc: `https://api.basescan.org/api?module=gastracker&action=gasoracle&apikey=${basescanApiKey}`,
  polygon: `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${polygonscanApiKey}`
};

const SendToken: FC<SendTokenProps> = ({ setStep, address, eth, base, polygon, PKey }) => {
  const [show, setShow] = useState<boolean>(false); // State for dropdown visibility
  const networkList: string[] = [`Eth`, `Base`, `Matic`]; // List of balance options
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [network, setNetwork] = useState('Choose network');
  const [balance, setBalance] = useState('Choose network');
  const [userGasFee, setUserGasFee] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // State to hold gas prices and selected gas price
  const [gasPrices, setGasPrices] = useState({ slow: 0, standard: 0, fast: 0 });
  const [selectGasPrice, setSelectGasPrice] = useState(0);
  const [currencyPriceInUSD, setCurrencyPriceInUSD] = useState(0);
  const fetchCurrencyPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      setCurrencyPriceInUSD(response.data.ethereum.usd);
    } catch (error) {
      console.error('Failed to fetch currency price:', error);
    }
  };

  const sendTransaction = async () => {
    let chainId = '1';
    if (network === 'Base') {
      chainId = '8435';
    } else if (network === 'Matic') {
      chainId = '137';
    }
    const api = axios.create({
      //  baseURL: 'https://dapphub-backend-apis.fly.dev',
      // baseURL: 'http://localhost:8080',
      baseURL: 'https://dapphub-account-provider.fly.dev',
      withCredentials: true
    });
    const obj = {
      decryptedPrivateKey: PKey,
      transaction: {
        to: recipient,
        value: ethers.parseUnits(amount.toString(), "ether").toString(),
        gasLimit: '21000',
        gasPrice: ethers.parseUnits(selectGasPrice.toString(), "gwei").toString()
      },
      chainId: '137'
    };

    await api.post('/sendTransaction', obj).then((response) => {
      if (response.status === 200) {
        setStep((prev) => prev + 1);
      } else {
        console.log("Something went wrong");
      }
    });
  };

  const fetchGasPrices = async (network: string) => {
    try {
      const response = await axios.get(gasApis[network]);
      let prices = { slow: 0, standard: 0, fast: 0 };

      switch (network) {
        case 'ethereum':
        case 'bsc':
        case 'polygon':
          prices = {
            slow: parseInt(response.data.result.SafeGasPrice, 10),
            standard: parseInt(response.data.result.ProposeGasPrice, 10),
            fast: parseInt(response.data.result.FastGasPrice, 10)
          };
          break;
        default:
          console.error('Unsupported network');
      }

      setGasPrices(prices);
    } catch (error) {
      console.error('Error fetching gas prices:', error);
    }
  };

  // Function to set balance
  function getBalance(network: string): void {
    if (network === 'Eth') {
      setNetwork('ethereum');
      setBalance(eth);
    } else if (network === 'Base') {
      setNetwork('bsc');
      setBalance(base);
    } else if (network === 'Matic') {
      setNetwork('polygon');
      setBalance(polygon);
    }
  }
  // Example network selection logic
  useEffect(() => {
    fetchCurrencyPrice();
    if (network) fetchGasPrices(network);
  }, [network]);

  // Convert Gwei to ETH (or other network currency) and then to USD
  const convertGasPriceToUSD = (gasPriceGwei: number, gasLimit: number = 21000) => {
    const gasPriceETH = gasPriceGwei / 1e9; // Convert Gwei to ETH
    const totalCostETH = gasPriceETH * gasLimit;
    setUserGasFee(totalCostETH);
    return totalCostETH * currencyPriceInUSD; // Convert to USD
  };

  // Callback function passed to TransactionSpeedSlider
  const handleGasPriceSelection = (price: number) => {
    setSelectGasPrice(price);
    const totalCostUSD = convertGasPriceToUSD(price);
    setTotalCost(totalCostUSD);
    console.log(`Total transaction cost: ${totalCostUSD} USD`);
  };

  return (
    <>
      <div className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none custom-scrollbar">
        <div className="rounded-xl bg-white mx-auto max-w-460 w-full p-4 sm:p-6 max-h-80vh overflow-auto custom-scrollbar">
          <div className="flex justify-between items-center">
            {/* Modal title and close button */}
            <h2 className="text-base lg:text-2xl font-semibold capitalize">Send Money</h2>
            <button className="p-3 border rounded-full bg-white" onClick={() => setStep(0)}>
              <img src={cross} width={17} height={15} />
            </button>
          </div>
          <div>
            <h2 className="text-sm lg:text-base font-medium my-4">Payment Source:</h2>
            {/* Payment source details */}
            <div className="border-[1.5px] border-solid rounded-10 border-secondary-color border-opacity-20 px-2 py-4 md:p-4 relative bottom-1.5 flex justify-between shadow-md">
              <div className="flex items-center gap-1 md:gap-3">
                <img src="../public/images/avatar.png" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="text-sm lg:text-base font-medium">Main Wallet</h4>
                  <p className="text-secondary text-xs">Network: {network}</p>
                  <p className="text-secondary text-xs">
                    {address.slice(0, 6)}....{address.slice(-4)}
                  </p>
                </div>
              </div>
              {/* Balance dropdown */}
              <div className="flex items-center relative cursor-pointer" onClick={() => setShow((prev) => !prev)}>
                <p className="text-secondary text-xs leading-none font-medium ml-2 mr-3">
                  Balance: {balance.toLocaleString()}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M10.4534 4.77167H6.81926H3.54676C2.98676 4.77167 2.70676 5.44833 3.10343 5.845L6.1251 8.86667C6.60926 9.35083 7.39676 9.35083 7.88093 8.86667L9.0301 7.7175L10.9026 5.845C11.2934 5.44833 11.0134 4.77167 10.4534 4.77167Z"
                    fill="#1A1C1E"
                  />
                </svg>
                {/* Balance options */}
                <div
                  className={`absolute top-full mt-4 z-50 bg-primary-bg left-0 right-0 w-full border shadow-sm p-2 ${
                    show ? '' : 'hidden'
                  }`}
                >
                  <ul>
                    {networkList.map((network) => {
                      return (
                        <li key={network}>
                          <span onClick={() => getBalance(network)}>{network}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Transaction details */}
          <div className="flex flex-col items-center justify-center my-6">
            {/* <h1 className="text-2xl md:text-4xl font-bold">$100.00</h1> */}
            <input
              className="px-5 py-3 w-full border bg-opacity-25 border-secondary-color border-opacity-25 rounded-10 placeholder:text-sm bg-primary-bg placeholder:text-secondary-color"
              type="amount"
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              name="amount"
              id="amount"
              placeholder="Amount you want to send"
            />
            {/* <p className="text-xs md:text-sm text-secondary">incl. fees (- POL 111.688/ -$100.00) </p> */}
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
            <div>
              <input
                className="px-5 py-3 w-full border bg-opacity-25 border-secondary-color border-opacity-25 rounded-10 placeholder:text-sm bg-primary-bg placeholder:text-secondary-color"
                type="recipient"
                value={recipient}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
                name="recipient"
                id="recipient"
                placeholder="Who you want to send crypto to"
              />
            </div>
          </div>

          <div className="mt-5">
            {/* transaction cost */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-medium leading-none">Transaction Speed</h2>
              <p className="text-base font-medium leading-none">Fee: ${userGasFee.toFixed(4)}</p>
            </div>
            <div className="w-full bg-[#D9D9D9] h-1.5 cursor-pointer">
              {/* Transaction Slider */}
              <TransactionSpeedSlider gasPrices={gasPrices} onSelect={handleGasPriceSelection} />
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 mt-14">
            <p className="text-sm w-[150px] text-secondary-color">
              You are paying {amount === '' ? 0 : amount} {network === 'Choose network' ? 'network' : network} to{' '}
              {recipient === '' ? 'nobody' : recipient.slice(0, 6)}....{recipient.slice(-4)}
            </p>
            <button
              className="w-[115px] h-[40px] bg-yellow-color text-xs md:text-sm font-medium border rounded-10"
              onClick={() => sendTransaction()}
            >
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
