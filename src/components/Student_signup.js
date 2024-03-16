import React, { useRef, useState } from "react";
import { ethers } from 'ethers';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from "./utilites/LoadingButton";
import CONTRACT_ABI from "./Contract/MainToken.json"

// Load environment variables
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const RPC_URL = process.env.REACT_APP_RPC_URL;
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const Sign_up = () => {
  const form = useRef();
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);


      console.log('Initializing Ether.js...');

      const formData = new FormData(form.current);
        // Getting Form values:
        const _rname = formData.get('fullname');
        // const _email = formData.get('email');
        // const _location = formData.get('location');
        // const _description = formData.get('description');
        const _pcd = formData.get('pcd');
        const _password = formData.get('password');
        const _uuid = formData.get('uuid');
      
        console.log('Form values:', _rname,_pcd, _password, _uuid);

      const wallet = new ethers.Wallet(PRIVATE_KEY);
      const contractAddress = CONTRACT_ADDRESS;

      // Set the provider for the wallet
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const connectedWallet = wallet.connect(provider);

      const contract_abi = CONTRACT_ABI.abi;
      const Main_Contract = new ethers.Contract(contractAddress, contract_abi, connectedWallet);

      console.log('Ether.js initialized successfully');

      try {
    
        const deploySubContractResult = await Main_Contract.deploySubContract(_rname,_pcd,_password,_uuid);
        const receipt = await deploySubContractResult.wait();
        console.log('Subcontract successfully deployed.', receipt);

        // Getting subcontract addr.
        const getSubContract = await Main_Contract.getSubContractDetails(_uuid);
        console.log('Subcontract address:', getSubContract[3]);

        document.cookie = `Sub_add=${getSubContract[3]}; path=/`;
        sessionStorage.setItem('Sub_add', getSubContract[3]);

        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          history('/student_login');
        }, 1500);                     // Redirect after 1.5 seconds
      } catch (error) {
        console.error('Error:', error.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error using private key:', error.message);
      console.log(error);
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    const fullName = form.current.elements.fullname.value;
    // const email = form.current.elements.email.value;
    // const location = form.current.elements.location.value;
    // const description = form.current.elements.description.value;
    const pcd = form.current.elements.pcd.value;
    const password = form.current.elements.password.value;
    const uuid = form.current.elements.uuid.value;

    if (fullName && password) {
      // All required fields are filled, proceed with form submission
      if (!isLoading) {
        handleSubmit(event);
      }
    } else {
      // Display an error message or handle the empty fields case as needed
      alert('Please fill in all required fields');
    }
  };


  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../styles/style.css" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@700&family=Fredoka&family=Koh+Santepheap:wght@300;400;700&family=Roboto+Condensed:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kelly+Slab&display=swap"
          rel="stylesheet"
        />
        <title>Passport System</title>
      </head>

      <body className="bg-background flex flex-col min-h-screen w">
        <div className="flex mt-32 ml-48 space-x-40">
          <div>
            <h1 className="font-kons text-8xl">SIGN UP</h1>
            <img src="../images/Passport.png" alt="" className="h-96 mt-12" />
          </div>

          <div className="bg-pink-here max-w-7xl pl-10 pr-20 rounded-3xl border-4 border-blue-here">
            <form ref={form} onSubmit={handleSubmit} className="font-kelly pt-8 ml-10 mt-5 space-y-2">
              {/* Full Name */}
              <label htmlFor="fullname" className="text-3xl mt-8">
                Name
              </label>
              <br />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                required
                className="h-10 w-96 px-5 focus:border-blue-here focus:border-4 hover:border-blue-here hover:border-4"
              />{' '}
              <br />
              <br />

              {/* Email */}
              {/* <label htmlFor="email" className="text-3xl">
                Email
              </label>{' '}
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="font-normal h-10 w-96 px-5 focus:border-blue-here focus:border-4 hover:border-blue-here hover:border-4"
              />{' '}
              <br />
              <br /> */}

              {/* Location */}
              {/* <label htmlFor="location" className="text-3xl mt-8">
                Location
              </label>
              <br />
              <input
                type="text"
                name="location"
                placeholder="Location"
                required
                className="h-10 w-96 px-5 focus:border-blue-here focus:border-4 hover:border-blue-here hover:border-4"
              />{' '}
              <br />
              <br /> */}

              {/* Description */}
              {/* <label htmlFor="description" className="text-3xl mt-8">
                Description
              </label>
              <br />
              <input
                type="text"
                name="description"
                placeholder="Description"
                required
                className="h-10 w-96 px-5 focus:border-blue-here focus:border-4 hover:border-blue-here hover:border-4"
              />{' '}
              <br />
              <br /> */}

              {/* pcd */}
              <label htmlFor="pcd" className="text-3xl mt-8">
                pcd
              </label>
              <br />
              <input
                type="text"
                name="pcd"
                placeholder="pcd"
                required
                className="h-10 w-96 px-5 focus:border-blue-here focus:border-4 hover:border-blue-here hover:border-4"
              />{' '}
              <br />
              <br />

              {/* Password */}
              <label htmlFor="password" className="text-3xl">
                Password
              </label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="h-10 w-96 px-5 focus:border-blue-here focus:border-4 hover:border-blue-here hover:border-4"
              />

              <br />
              <br />
              {/* uuid */}
              <label htmlFor="uuid" className="text-3xl mt-8">
                uuid
              </label>
              <br />
              <input
                type="text"
                name="uuid"
                placeholder="uuid"
                required
                className="h-10 w-96 px-5 focus:border-blue-here focus:border-4 hover:border-blue-here hover:border-4"
              />{' '}
              <br />
              <br />

              <LoadingButton isLoading={isLoading} isSuccess={isSuccess} onClick={handleButtonClick} />
              <br />

              <button type="submit" className="h-12 absolute ml-56 text-xl ">
                <Link className="hover:bg-background hover:bg-opacity-40 hover:text-white hover:px-2 hover:rounded" to="/student_login">
                  Back to Login &gt;&gt;&gt;
                </Link>
              </button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Sign_up;