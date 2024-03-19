import React, { FC, useState } from 'react';
import DoughnutChart from '../components/DoughnutChart';
import SendToken from '../components/SendToken';
import PaymentComplete from '../components/PaymentComplete';
import SmartContact1 from '../components/SmartContact1';
import SmartContact2 from '../components/SmartContact2';
import TokenApproval from '../components/TokenApproval';
import VerifyingAddress from '../components/VerifyingAddress';

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

  const [step, setStep] = useState<number>(0);
  const [tokenStep, setTokenStep] = useState<number>(0);
  // Token transaction state controller
  function sendTransaction(val: number): void {
    // eslint-disable-next-line no-return-assign
    setStep((prev) => (prev = val));
  }
  // Token send state controller
  function sendToken(val: number): void {
    setTokenStep((prev) => (prev = val));
  }

  return (
    <div className="container max-w-920 mx-auto px-4 py-9">
      <div className="flex flex-col md:flex-row gap-5 mb-7">
        <div className="md:w-[calc(100%-310px)] p-4 md:p-6 rounded-2xl bg-white shadow-md">
          <div className="m-4 pb-6 border-b">
            <p className="text-secondary-color text-base capitalize mb-2">Total Balance</p>
            <h1 className="text-4xl">$20,457.09</h1>
          </div>
          <div className="flex justify-between items-center m-4">
            <p className="text-secondary-color text-base capitalize ">payout method</p>
            <p className="text-base">XYZ....4xq</p>
          </div>
          <div className="flex gap-4 mt-8 m-4">
            <button
              className="border py-2 px-6 rounded-10 bg-black text-white hover:bg-white hover:text-black transition-all duration-300 flex-1"
              onClick={() => sendTransaction(1)}
            >
              Withdraw
            </button>
            <button
              onClick={() => sendToken(1)}
              className="border py-2 px-6 rounded-10 hover:bg-black hover:text-white transition-all duration-300 flex-1"
            >
              Deposit
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
                  <p className="text-xs md:text-sm">BTC</p>
                  <p className="text-xs md:text-sm opacity-40">45%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">$9,205.19</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0094FF] h-1.5 w-3 rounded-sm" />
                  <p className="text-xs md:text-sm">BNB</p>
                  <p className="text-xs md:text-sm opacity-40">30%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">$9,205.19</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#28C193] h-1.5 w-3 rounded-sm" />
                  <p className="text-xs md:text-sm">Solana</p>
                  <p className="text-xs md:text-sm opacity-40">15%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">$9,205.19</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#5344FF] h-1.5 w-3 rounded-sm" />
                  <p className="text-xs md:text-sm">Polygon</p>
                  <p className="text-xs md:text-sm opacity-40">10%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-medium">$9,205.19</p>
                </div>
              </div>
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
            {data.map((table) => (
              <tbody key={table.id} className="text-secondary-color">
                <tr className="border-b">
                  <th scope="row" className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">
                    {table.Description}
                  </th>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">{table.dateTime}</td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal uppercase">
                    {table.wallet}
                  </td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">{table.amount}</td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">{table.inUsd}</td>
                  <td className="p-1.5 truncate md:px-2 md:py-2 text-xs md:text-base font-normal">{table.receipt}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      {step === 1 ? <SendToken setStep={setStep} /> : null}
      {step === 2 ? <PaymentComplete setStep={setStep} /> : null}

      {tokenStep === 1 ? <SendToken setStep={setTokenStep} /> : null}
      {tokenStep === 2 ? <TokenApproval setTokenStep={setTokenStep} /> : null}
      {/* <SmartContact1 setTokenStep={setTokenStep} /> */}
      {tokenStep === 3 ? <SmartContact2 setTokenStep={setTokenStep} /> : null}
      {tokenStep === 4 ? <VerifyingAddress setTokenStep={setTokenStep} /> : null}
      {tokenStep === 5 ? <PaymentComplete setStep={setTokenStep} /> : null}
    </div>
  );
};

export default Wallet;
