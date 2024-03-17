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
        console.log(_rname,_pcd,_password,_uuid);
    
        const deploySubContractResult = await Main_Contract.deploySubContract(_rname,_pcd,_password,_uuid);
        const receipt = await deploySubContractResult.wait();
        console.log('Subcontract successfully deployed.', receipt);

        // Getting subcontract addr.
        const getSubContract = await Main_Contract.getSubContractDetails(_uuid);
        console.log('Subcontract address:', "0x1CdE990BA7b7Ba709BFb5334c4a45B2cc4DA240f");

        document.cookie = `Sub_add=${"0x1CdE990BA7b7Ba709BFb5334c4a45B2cc4DA240f"}; path=/`;
        sessionStorage.setItem('Sub_add', "0x1CdE990BA7b7Ba709BFb5334c4a45B2cc4DA240f");

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
        {/* <link rel="stylesheet" href="./styles/main.css" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@700&family=Fredoka&family=Koh+Santepheap:wght@300;400;700&family=Roboto+Condensed:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kelly+Slab&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="../styles/main.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&family=Alegreya:wght@400;500;600;700;800;900&family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Kelly+Slab&display=swap"
          rel="stylesheet"
        />

        <title>Before Deadline Token</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      <body>
        <div style={{ marginTop: "80px" }}>
          <div>
            <h1
              style={{
                color: "#2196F3",
                fontFamily: "Amaranth",
                textAlign: "center",
              }}
            >
              SIGN UP
            </h1>
          </div>

          <div style={{ marginLeft: "180px", marginTop: "50px" }}>
            <form
              ref={form}
              onSubmit={handleSubmit}
              style={{ marginLeft: "350px" }}
            >
              <tr>
                <td style={{ width: "250px" }}>
                  <label
                    htmlFor="fullname"
                    style={{
                      padding: "25px",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    Name
                  </label>
                </td>
                <td style={{ width: "250px" }}>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="FULL NAME"
                    required
                    style={{
                      backgroundColor: "#CFD8DC",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }}
                  />{" "}
                </td>
              </tr>
              {/* Full Name */}

              <br />
              <br />
         
              {/* pcd */}
              <tr>
                <td style={{ width: "250px" }}>
                  <label
                    htmlFor="pcd"
                    style={{
                      padding: "25px",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    PCD
                  </label>
                </td>
                <td style={{ width: "250px" }}>
                  <input
                    type="text"
                    name="pcd"
                    placeholder="PCD"
                    required
                    style={{
                      backgroundColor: "#CFD8DC",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }}
                  />{" "}
                </td>
              </tr>

              <br />
              <br />
              {/* Password */}
              <tr>
                
                <td style={{ width: "250px" }}>
                <label
                    htmlFor="password"
                    style={{
                      padding: "25px",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    Password
                  </label>
                </td>
                  <td>

                
                  <input
                    type="password"
                    name="password"
                    placeholder="PASSWORD"
                    required
                    style={{
                      backgroundColor: "#CFD8DC",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }}
                  />
                
                </td>
                 
              </tr>

              <br />
              <br />
              {/* uuid */}

              <tr>
                <td style={{width:"250px"}}>
                  <label
                    htmlFor="uuid"
                    style={{
                      padding: "25px",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    UUID
                  </label>
                </td>

                <td>
                  <input
                    type="text"
                    name="uuid"
                    placeholder="UUID"
                    required
                    style={{
                      backgroundColor: "#CFD8DC",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }}
                  />{" "}
                </td>
              </tr>

              <br />
              <br />
              <div style={{paddingLeft:"30px"}}>
              <LoadingButton
                isLoading={isLoading}
                isSuccess={isSuccess}
                onClick={handleButtonClick}
              />
              </div>
              
              <br />
              <br/>
              <button type="submit" style={{border:"none",background:"none",textDecoration:"none"}}>
                <Link to="/student_login" style={{fontFamily:"amar",fontSize:"20px",marginLeft:"200px",color:"black",fontWeight:"bold"}}>Back to Login ...</Link>
              </button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Sign_up;