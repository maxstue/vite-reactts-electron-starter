import React, { FC } from 'react';

import check from '../public/images/check.png';

interface PaymentCompleteProps {
  setStep: (step: number) => void;
}

const PaymentComplete: FC<PaymentCompleteProps> = ({ setStep }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <section className="flex justify-center">
          <div className="rounded-xl bg-white max-w-[340px] w-full p-4 flex flex-col items-center justify-center px-16 relative z-50">
            <img src={check} width={75} height={75} />
            <h2 className="text-2xl font-semibold mt-7 mb-3">Payment completed!</h2>
            <h4 className="text-base text-secondary-color text-center">Praesent non eros enim Nullam luctus tortor.</h4>
          </div>
        </section>
        <div className="opacity-65 fixed inset-0 z-40 bg-black" onClick={() => setStep(prev => (prev = 0))}></div>
      </div>
    </>
  );
};

export default PaymentComplete;