import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import CONTRACT_ABI from "./Contract/MainToken.json"

const StudentPortal = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);


    useEffect(() => {
        const interval = setInterval(async () => {
            try {

                const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
                const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

                const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
                const connectedWallet = wallet.connect(provider);

                const contract_abi = CONTRACT_ABI.abi;
                const Main_Contract = new ethers.Contract(contractAddress, contract_abi, connectedWallet);

                const response = await Main_Contract.getLeaderboard();
                // console.log("Response:",response);

                const users = response[0];
                // console.log("Users:",users);
                const userBalances = response[1];
                // console.log("User Tokens:",userBalances);

                // Combine user addresses and token balances into an array of objects
                const leaderboardData = users.map((userAddress, index) => ({
                    address: userAddress,
                    tokens: userBalances[index].toString()
                }));
                
                // Sort leaderboard data in descending order based on tokens
                leaderboardData.sort((a, b) => b.tokens - a.tokens);

                // Update the leaderboard data
                setLeaderboardData(leaderboardData);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    return (
    <html>
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
        <div>
          <nav
            style={{
              marginTop: "45px",
              background: "#37474F",
              height: "30px",
              padding: "15px",
              fontWeight: "bold",
              fontSize: "15px",
              borderRadius: "100px 100px 100px 100px",
              paddingLeft: "50px",
              paddingTop: "20px",
              paddingLeft: "30px",
            }}
          >
            <div style={{ marginTop: "-20px" }}>
              <img
                src="https://www.nicepng.com/png/detail/964-9648552_png-file-svg-profile-icon-white-png.png"
                alt="profile photo"
                style={{
                  borderRadius: "50%",
                  height: "50px",
                  marginTop: "-15px",
                }}
              />
              {/* <button
                type="submit"
                style={{
                  marginLeft: "300px",
                  background: "none",
                  border: "none",
                  textDecoration: "none",
                  width: "300px",
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "black",
                    background: "#D9D9D9",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    borderRadius: "100px 100px 100px 100px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    fontFamily: "amar",
                  }}
                >
                  Withdraw
                </Link>
              </button> */}

              <button
                type="submit"
                style={{
                  marginLeft: "50px",
                  background: "none",
                  border: "none",
                  textDecoration: "none",
                  width: "300px",
                }}
              >
                <Link
                  to="/wallet"
                  style={{
                    color: "black",
                    background: "#D9D9D9",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    borderRadius: "100px 100px 100px 100px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    fontFamily: "amar",
                  }}
                >
                  Available Tokens
                </Link>
              </button>

              <Link
                to="/"
                style={{
                  color: "#D9D9D9",
                  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "amar",
                  textDecoration: "none",
                  marginLeft:"300px"
                }}
              >
                Logout
              </Link>
            </div>
          </nav>

          <div
            style={{
              background: "#D9D9D9",
              borderRadius: "70px 70px 70px 70px",
              padding: "10px",
              marginTop: "50px",
              height: "250px",
              paddingLeft: "50px",
              marginRight: "200px",
              marginLeft: "200px",
            }}
          >
            <h1 style={{}}>Leaderboard</h1>
            {Object.keys(leaderboardData).length > 0 ? (
              leaderboardData.map((user, index) => (
                <div
                  style={{
                    fontFamily: "Amar",
                    fontWeight: "bold",
                    
                  }}
                  key={index}
                >
                  <p
                    style={{
                      color: "#D9D9D9",
                      padding: "15px",
                      background: "#37474F",
                      borderRadius: "100px 100px 100px 100px",
                      marginRight: "20px",
                    }}
                  >
                    {user.address}: {user.tokens} tokens
                  </p>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: "#D9D9D9",
                  padding: "15px",
                  background: "#37474F",
                  borderRadius: "100px 100px 100px 100px",
                  marginRight: "20px",
                }}
              >
                No leaderboard data available
              </p>
            )}
          </div>


<div style={{paddingLeft:"100px"}}>
          {/* Subjects */}
          <tr>
          <td style={{paddingLeft:"35px"}}><div
              style={{
                background: "#D6D6D6",
                fontFamily: "amar",
                width: "334px",
                marginTop: "50px",
                padding: "25px",
                fontWeight: "bold",
                borderRadius: "50px 50px 50px 50px",
                fontSize: "15px",
                alignContent: "center",
              }}
            >
              Subject 1:
              <br />
              <br />
              <label>Assignment:</label>
              <input type="file" />
              <br />
              <br />
              <label>Deadline:</label>
              <input type="time" />
              <br />
              <br />
              <input
                type="submit"
                style={{
                  fontFamily: "Amar",
                  fontSize: "15px",
                  fontWeight: "Bold",
                  backgroundColor: "#03A9F4",
                  width: "150px",
                  padding: "15px",
                  borderRadius: "100px 100px 100px 100px",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "150px",
                }}
              />
              <br />
            </div></td>

            <td style={{paddingLeft:"35px"}}><div
              style={{
                background: "#D6D6D6",
                fontFamily: "amar",
                width: "334px",
                marginTop: "50px",
                padding: "25px",
                fontWeight: "bold",
                borderRadius: "50px 50px 50px 50px",
                fontSize: "15px",
                alignContent: "center",
              }}
            >
              Subject 2:
              <br />
              <br />
              <label>Assignment:</label>
              <input type="file" />
              <br />
              <br />
              <label>Deadline:</label>
              <input type="time" />
              <br />
              <br />
              <input
                type="submit"
                style={{
                  fontFamily: "Amar",
                  fontSize: "15px",
                  fontWeight: "Bold",
                  backgroundColor: "#03A9F4",
                  width: "150px",
                  padding: "15px",
                  borderRadius: "100px 100px 100px 100px",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "150px",
                }}
              />
              <br />
            </div></td>
            
            
            <td style={{paddingLeft:"35px"}}>
              <div
                style={{
                  background: "#D6D6D6",
                  fontFamily: "amar",
                  width: "334px",
                  marginTop: "50px",
                  padding: "25px",
                  fontWeight: "bold",
                  borderRadius: "50px 50px 50px 50px",
                  fontSize: "15px",
                  alignContent: "center",
                }}
              >
                Subject 3:
                <br />
                <br />
                <label>Assignment:</label>
                <input type="file" />
                <br />
                <br />
                <label>Deadline:</label>
                <input type="time" />
                <br />
                <br />
                <input
                  type="submit"
                  style={{
                    fontFamily: "Amar",
                    fontSize: "15px",
                    fontWeight: "Bold",
                    backgroundColor: "#03A9F4",
                    width: "150px",
                    padding: "15px",
                    borderRadius: "100px 100px 100px 100px",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "150px",
                  }}
                />
                <br />
              </div>
            </td>
          </tr>

          <tr>
            <td style={{paddingLeft:"35px"}}>
              <div
                style={{
                  background: "#D6D6D6",
                  fontFamily: "amar",
                  width: "334px",
                  marginTop: "50px",
                  padding: "25px",
                  fontWeight: "bold",
                  borderRadius: "50px 50px 50px 50px",
                  fontSize: "15px",
                  alignContent: "center",
                }}
              >
                Subject 4:
                <br />
                <br />
                <label>Assignment:</label>
                <input type="file" />
                <br />
                <br />
                <label>Deadline:</label>
                <input type="time" />
                <br />
                <br />
                <input
                  type="submit"
                  style={{
                    fontFamily: "Amar",
                    fontSize: "15px",
                    fontWeight: "Bold",
                    backgroundColor: "#03A9F4",
                    width: "150px",
                    padding: "15px",
                    borderRadius: "100px 100px 100px 100px",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "150px",
                  }}
                />
                <br />
              </div>
            </td>
            <td style={{paddingLeft:"35px"}}>
              <div
                style={{
                  background: "#D6D6D6",
                  fontFamily: "amar",
                  width: "334px",
                  marginTop: "50px",
                  padding: "25px",
                  fontWeight: "bold",
                  borderRadius: "50px 50px 50px 50px",
                  fontSize: "15px",
                  alignContent: "center",
                }}
              >
                Subject 5:
                <br />
                <br />
                <label>Assignment:</label>
                <input type="file" />
                <br />
                <br />
                <label>Deadline:</label>
                <input type="time" />
                <br />
                <br />
                <input
                  type="submit"
                  style={{
                    fontFamily: "Amar",
                    fontSize: "15px",
                    fontWeight: "Bold",
                    backgroundColor: "#03A9F4",
                    width: "150px",
                    padding: "15px",
                    borderRadius: "100px 100px 100px 100px",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "150px",
                  }}
                />
                <br />
              </div>
            </td>

            <td style={{paddingLeft:"35px"}}>
              <div
                style={{
                  background: "#D6D6D6",
                  fontFamily: "amar",
                  width: "334px",
                  marginTop: "50px",
                  padding: "25px",
                  fontWeight: "bold",
                  borderRadius: "50px 50px 50px 50px",
                  fontSize: "15px",
                  alignContent: "center",
                }}
              >
                Subject 6:
                <br />
                <br />
                <label>Assignment:</label>
                <input type="file" />
                <br />
                <br />
                <label>Deadline:</label>
                <input type="time" />
                <br />
                <br />
                <input
                  type="submit"
                  style={{
                    fontFamily: "Amar",
                    fontSize: "15px",
                    fontWeight: "Bold",
                    backgroundColor: "#03A9F4",
                    width: "150px",
                    padding: "15px",
                    borderRadius: "100px 100px 100px 100px",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "150px",
                  }}
                />
                <br />
              </div>
            </td>

          </tr>
</div>
          
        </div>
      </body>
    </html>
  );
}

export default StudentPortal;
