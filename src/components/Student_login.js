import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import LoadingButton from "./utilites/LoadingButton";
import CONTRACT_ABI from "./Contract/SubContract.json";

const Login = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const _pcd = form.current.elements.email.value;
      const _password = form.current.elements.password.value;

      // Initialize ethers by connecting to the network
      const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      const privateKey = process.env.REACT_APP_PRIVATE_KEY;
      const wallet = new ethers.Wallet(privateKey);
      const signer = wallet.connect(provider);

      const contractAddress = sessionStorage.getItem('Sub_add');
      const abi = CONTRACT_ABI.abi;
      const Contract = new ethers.Contract(contractAddress, abi, signer);

      console.log("Attempting to log in with password:", _password, "and pcd:", _pcd);

      const loginSuccessful = await Contract.login(_password, _pcd);
      console.log('Login result:', loginSuccessful);

      if (loginSuccessful) {
        console.log("Login successful!");
        // Generate session ID
        const sessionId = generateUUID();
        // Store session ID locally
        sessionStorage.setItem('us_sessionId', sessionId);
        setIsLoading(false);
        setIsSuccess(true);
        navigate("/student_portal");
      } else {
        console.error("Invalid credentials. Login failed.");
        setErrorMessage("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error calling login function:", error);
      setErrorMessage("Invalid credentials. Please try again.");
      setIsLoading(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }

  };

  const generateUUID = () => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    // const fullName = form.current.elements.username.value;
    const email = form.current.elements.email.value;
    const password = form.current.elements.password.value;

    if (email && password) {
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
        <title>Passport System</title>
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
              LOGIN
            </h1>
          </div>

          <div>
            {errorMessage && <div>{errorMessage}</div>}
            <form
              ref={form}
              onSubmit={handleSubmit}
              
            
              style={{ marginLeft: "550px" }}
            >
              <tr style={{height:"100px",marginTop:"20px"}}>
                <td style={{ width: "250px" }}>
                  {/*Email */}
                  <label
                    htmlFor="email"
                    style={{
                      padding: "25px",
                      fontWeight: "bold",
                      fontSize: "30px",
    
                    }}
                  >
                    Email
                  </label>{" "}
                  
                </td>
                <td>
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
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

              {/* Password */}
              <tr>
                <td>
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
                    name="password"
                    type="password"
                    placeholder="Password"
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

              {/* Buttons */}
              
                    <div style={{marginLeft:"30px",marginTop:"50px"}}>
                    <LoadingButton
                isLoading={isLoading}
                isSuccess={isSuccess}
                onClick={handleButtonClick}
              />
                    </div>
              
              <br/>
             
              <button className="rounded w-96 hover:bg-background hover:text-white hover:w-40 hover:ml-28" style={{border:"none",background:"none",textDecoration:"none",marginTop:"50px"}}>
                <Link to="/" style={{fontFamily:"amar",fontSize:"20px",marginLeft:"150px",color:"black",fontWeight:"bold"}}>New user? Signup&gt;&gt;</Link>
              </button>
              
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Login;