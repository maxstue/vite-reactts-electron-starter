/* eslint-disable react/function-component-definition */
import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginSlider from '../components/LoginSlider';
import DapphubAccount from '../components/DapphubAccount';

interface RegisterProps {}

const CreateDA: FC<RegisterProps> = () => {
  const navigate = useNavigate(); // Navigate hook from react-router-dom
  const [walletName, setWalletName] = useState<string>(''); // State for email input
  const [walletpin, setWalletPin] = useState<string>(''); // State for password input
  const [walletNameError, setWalletNameError] = useState<string>(''); // State for email error message
  const [walletPinError, setWalletPinError] = useState<string>(''); // State for password error message

  // Function to validate email
  const validateWalletName = (): boolean => {
    // Regular expression for email validation
    if (walletName.length === 0) {
      setWalletNameError('Wallet Name cannot be empty');
      return false;
    }
    setWalletNameError('');
    return true;
  };

  // Function to validate password
  const validatePin = (): boolean => {
    if (walletpin.length < 8 || walletpin.length > 20) {
      setWalletPinError('Password must be between 8 and 20 characters');
      return false;
    }
    setWalletPinError('');
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isNameValid: boolean = validateWalletName();
    const isPinValid: boolean = validatePin();

    if (isNameValid && isPinValid) {
      navigate('/home'); // Redirect to login page on successful registration
    }
  };

  return (
    // Register section layout
    <section className="max-w-[1440px] xl:max-w-full container min-h-screen mx-auto flex flex-col lg:flex-row xl:gap-14">
      {/* Login slider component */}
      <LoginSlider />

      {/* Login form component with link to login page */}
      <DapphubAccount
        linkTo="/login" // Link to login page
        handleSubmit={handleSubmit} // Submission handler function
        walletName={walletName} // Email state
        setWalletName={setWalletName} // Email state setter function
        walletPin={walletpin} // Password state
        setWalletPin={setWalletPin} // Password state setter function
        validateWalletName={validateWalletName} // Email validation function
        validatePin={validatePin} // Password validation function
        walletNameError={walletNameError} // Email error message
        walletPinError={walletPinError} // Password error message
      />
    </section>
  );
};

export default CreateDA; // Exporting Register component
