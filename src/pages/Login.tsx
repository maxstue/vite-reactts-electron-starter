import React, { FC, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/AppContext';
import LoginSlider from '../components/LoginSlider';
import LoginForm from '../components/LoginForm';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate(); // Navigate hook from react-router-dom
  const { setUsername } = useContext(Context); // Accessing setUsername function from context
  const [email, setEmail] = useState<string>(''); // State for email input
  const [password, setPassword] = useState<string>(''); // State for password input
  const [emailError, setEmailError] = useState<string>(''); // State for email error message
  const [passwordError, setPasswordError] = useState<string>(''); // State for password error message
  const nameList: string[] = ['John Doe', 'John Lark']; // List of names for demo
  const [name, setName] = useState<string>('Name Here'); // State for name input

  // Function to validate email
  const validateEmail = (): boolean => {
    // Regular expression for email validation
    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Function to validate password
  const validatePassword = (): boolean => {
    if (password.length < 8 || password.length > 20) {
      setPasswordError('Password must be between 8 and 20 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isEmailValid: boolean = validateEmail();
    const isPasswordValid: boolean = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setUsername(email); // Set username in context
      navigate('/home'); // Redirect to home page
      // Perform your login logic here
      console.log('Email:', email);
      console.log('Password:', password);
      // Reset form fields
      setEmail('');
      setPassword('');
    }
  };

  return (
    // Login section layout
    <section className="max-w-[1440px] xl:max-w-full container min-h-screen mx-auto flex flex-col lg:flex-row xl:gap-14">
      {/* Login slider component */}
      <LoginSlider />

      {/* Login form component */}
      <LoginForm
        linkTo={'/register'} // Link to registration page
        handleSubmit={handleSubmit} // Submission handler function
        email={email} // Email state
        setEmail={setEmail} // Email state setter function
        password={password} // Password state
        setPassword={setPassword} // Password state setter function
        validateEmail={validateEmail} // Email validation function
        validatePassword={validatePassword} // Password validation function
        emailError={emailError} // Email error message
        passwordError={passwordError} // Password error message
        name={name} // Name state
        setName={setName} // Name state setter function
        nameList={nameList} // List of names
        text="Sign up" // Text for link to registration page
      />
    </section>
  );
};

export default Login; // Exporting Login component