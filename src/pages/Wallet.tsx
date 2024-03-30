import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import DoughnutChart from '../components/DoughnutChart';
import SendToken from '../components/SendToken';
import PaymentComplete from '../components/PaymentComplete';
import SmartContact1 from '../components/SmartContact1';
import SmartContact2 from '../components/SmartContact2';
import TokenApproval from '../components/TokenApproval';
import VerifyingAddress from '../components/VerifyingAddress';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Transaction {
  id: number;
  Description: string;
  dateTime: string;
  wallet: string;
  amount: string;
  inUsd: string;
  receipt: string;
}

// eslint-disable-next-line react/function-component-definition
const Wallet: FC = () => {
  // Transaction list data
  const data: Transaction[] = [
    {
      id: 1,
      Description: 'Nullam tincidunt nisi augue',
      dateTime: '27 feb, 2024, 16:06 PM',
      wallet: 'XVF....1cd',
      amount: '160 Polygon',
      inUsd: '$160',
      receipt: '#4587'
    },
    {
      id: 2,
      Description: 'Nullam tincidunt nisi augue',
      dateTime: '27 feb, 2024, 16:06 PM',
      wallet: 'XVF....1cd',
      amount: '160 Polygon',
      inUsd: '$160',
      receipt: '#4587'
    },
    {
      id: 3,
      Description: 'Nullam tincidunt nisi augue',
      dateTime: '27 feb, 2024, 16:06 PM',
      wallet: 'XVF....1cd',
      amount: '160 Polygon',
      inUsd: '$160',
      receipt: '#4587'
    },
    {
      id: 4,
      Description: 'Nullam tincidunt nisi augue',
      dateTime: '27 feb, 2024, 16:06 PM',
      wallet: 'XVF....1cd',
      amount: '160 Polygon',
      inUsd: '$160',
      receipt: '#4587'
    }
  ];

  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('userEmail');
  const userAddress = searchParams.get('userAddress');
  const userPKey = searchParams.get('userPKey');
  const userWalletName = searchParams.get('userWalletName');
  const walletUnlocked = searchParams.get('walletUnlocked');

  const [ethBalance, setEthBalance] = useState(0);
  const [baseBalance, setBaseBalance] = useState(0);
  const [polygonBalance, setPolygonBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [ethPrice, setEthPrice] = useState(0);
  const [userWalletUnlocked, setUserWalletUnlocked] = useState(walletUnlocked);

  const etherscanApiKey = 'JCR88HEE12A3QDZM4EVJUH28ZFVIUFJU88';
  const basescanApiKey = '6KUVZZH9STIU2D2XFUXC6QVSCNXB2EK2M4';
  const polygonscanApiKey = 'HKJBA5EX2SRFPHCVQRQ4MVDE23PWJ51SFM';
  const coingeckoApiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

  useEffect(() => {
    // Fetch Ethereum price in USD
    axios.get(coingeckoApiUrl).then((response) => {
      setEthPrice(response.data.ethereum.usd);
    });

    // Fetch wallet balances

    // Ethereum
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${etherscanApiKey}`
      )
      .then((response) => {
        // Convert balance from Wei to Ether
        // console.log('Get user eth balance', response.status);
        const balanceInEth = response.data.result / 1e18;
        setEthBalance(balanceInEth.toFixed(3));
      });

    // Base
    axios
      .get(
        `https://api.basescan.org/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${basescanApiKey}`
      )
      .then((response) => {
        // Convert balance from Wei to Ether
        // console.log('Get user base balance', response.status);
        const balanceInBase = response.data.result / 1e18;
        setBaseBalance(balanceInBase.toFixed(3));
      });

    // Polygon
    axios
      .get(
        `https://api.polygonscan.com/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${polygonscanApiKey}`
      )
      .then((response) => {
        // Convert balance from Wei to Ether
        // console.log('Get user polygon balance', response.status);
        if (response.status === 200) console.log(response.data.result);
        const balanceInPolygon = response.data.result / 1e18;
        setPolygonBalance(balanceInPolygon.toFixed(3));
      });

    // Fetch transaction history (simplified example)
    axios
      .get(
        `https://api.polygonscan.com/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=999&page=1&offset=10&sort=asc&apikey=${polygonscanApiKey}`
      )
      .then((response) => {
        // console.log('Get user transactions', response.status);
        setTransactions(response.data.result);
      });
  }, []);

  const [step, setStep] = useState<number>(0);
  const [tokenStep, setTokenStep] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState('');
  // Token transaction state controller
  function sendTransaction(val: number): void {
    // eslint-disable-next-line no-return-assign
    setStep((prev) => (prev = val));
  }
  // Token send state controller
  function sendToken(val: number): void {
    setTokenStep((prev) => (prev = val));
  }

  function copyToClipboard(e) {
    navigator.clipboard.writeText(userAddress);

    setCopySuccess('EVM Address Copied!');
  }

  const balanceInUSD = ethBalance * ethPrice;

  console.log(transactions);
  return (
    <div className="container max-w-920 mx-auto px-4 py-9">
      <div className="flex flex-col md:flex-row gap-5 mb-7">
        <div className="md:w-[calc(100%-310px)] p-4 md:p-6 rounded-2xl bg-white shadow-md">
          <p>{copySuccess}</p>
          <div className="m-4 pb-6 border-b">
            <p className="text-secondary-color text-base capitalize mb-2">Total Balance</p>
            <h1 className="text-4xl">${balanceInUSD}</h1>
          </div>
          <div className="flex justify-between items-center m-4">
            <p className="text-secondary-color text-base capitalize ">Current EVM Wallet</p>
            <p className="text-base">
              {userAddress.slice(0, 6)} ..... {userAddress.slice(-4)}
            </p>
          </div>
          <div className="flex gap-4 mt-8 m-4">
            <button
              className="border py-2 px-6 rounded-10 bg-black text-white hover:bg-white hover:text-black transition-all duration-300 flex-1"
              onClick={() => sendTransaction(1)}
            >
              Send
            </button>
            <button
              onClick={() => {
                sendToken(1);
                copyToClipboard();
              }}
              className="border py-2 px-6 rounded-10 hover:bg-black hover:text-white transition-all duration-300 flex-1"
            >
              Receive
            </button>
          </div>
        </div>
        <div className="max-w-490 w-full rounded-3xl bg-white shadow-md p-4 md:p-6">
          <p className="mb-3">Allocation</p>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* <DoughnutChart /> */}
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-color h-1.5 w-3 rounded-sm" />
                  <p className="text-xs md:text-sm">ETH</p>
                  {/* <p className="text-xs md:text-sm opacity-40">45%</p> */}
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">{ethBalance}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0094FF] h-1.5 w-3 rounded-sm" />
                  <p className="text-xs md:text-sm">BASE Eth</p>
                  {/* <p className="text-xs md:text-sm opacity-40">30%</p> */}
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">{baseBalance}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#28C193] h-1.5 w-3 rounded-sm" />
                  <p className="text-xs md:text-sm">Polygon</p>
                  {/* <p className="text-xs md:text-sm opacity-40">15%</p> */}
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">{polygonBalance}</p>
                </div>
              </div>
              {/* <div className="flex justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#5344FF] h-1.5 w-3 rounded-sm" />
                  <p className="text-xs md:text-sm">Pulse</p>
                  <p className="text-xs md:text-sm opacity-40">10%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">$9,205.19</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium mb-6">Recent Transactions</h2>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-base font-semibold uppercase border-b">
              <tr>
                <th scope="col" className="px-1 py-1 md:px-2 md:py-2 text-xs md:text-lg truncate">
                  Description
                </th>
                <th scope="col" className="px-1 py-1 md:px-2 md:py-2 text-xs md:text-lg truncate">
                  date & time
                </th>
                <th scope="col" className="px-1 py-1 md:px-2 md:py-2 text-xs md:text-lg truncate">
                  wallet
                </th>
                <th scope="col" className="px-1 py-1 md:px-2 md:py-2 text-xs md:text-lg truncate">
                  amount
                </th>
                <th scope="col" className="px-1 py-1 md:px-2 md:py-2 text-xs md:text-lg truncate">
                  In usd
                </th>
                <th scope="col" className="px-1 py-1 md:px-2 md:py-2 text-xs md:text-lg truncate">
                  Receipt
                </th>
              </tr>
            </thead>
            {/* {transactions.map((tx) => (
              <tbody key={tx.hash} className="text-secondary-color">
                <tr className="border-b">
                  <th scope="row" className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">
                    {tx.hash}
                  </th>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">{tx.blockNumber}</td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal uppercase">
                    {tx.from}
                  </td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">{table.to}</td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">
                    {(tx.value / 1e18).toFixed(4)} ETH
                  </td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal"></td>
                </tr>
              </tbody>
            ))} */}
          </table>
        </div>
      </div>
      {step === 1 ? (
        <SendToken
          setStep={setStep}
          address={userAddress}
          eth={ethBalance}
          base={baseBalance}
          polygon={polygonBalance}
          PKey={userPKey}
        />
      ) : null}
      {step === 2 ? <PaymentComplete setStep={setStep} /> : null}

      {tokenStep === 1 ? (
        <SendToken
          setStep={setTokenStep}
          address={userAddress}
          eth={ethBalance}
          base={baseBalance}
          polygon={polygonBalance}
          PKey={userPKey}
        />
      ) : null}
      {tokenStep === 2 ? (
        <TokenApproval
          setTokenStep={setTokenStep}
          address={userAddress}
          eth={ethBalance}
          base={baseBalance}
          polygon={polygonBalance}
          PKey={userPKey}
        />
      ) : null}
      {/* <SmartContact1 setTokenStep={setTokenStep} /> */}
      {tokenStep === 3 ? <SmartContact2 setTokenStep={setTokenStep} /> : null}
      {tokenStep === 4 ? <VerifyingAddress setTokenStep={setTokenStep} /> : null}
      {tokenStep === 5 ? <PaymentComplete setStep={setTokenStep} /> : null}
    </div>
  );
};

export default Wallet;
