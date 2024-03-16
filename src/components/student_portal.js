import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import CONTRACT_ABI from "./Contract/MainToken.json"

const StudentPortal = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                // Initialize web3 with the provider from your Metamask extension
                // const web3 = new Web3(window.ethereum);

                const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
                const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

                // Set the provider for the wallet
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
        <div>
            <nav className="flex space-x-4">
                <img src="#" alt="profile photo" className="h-12 w-12" />
                <Link to="/">Withdraw</Link>
                <Link to='/'>Available Tokens</Link>
                <Link to="/">Logout</Link>
            </nav>

            <div className="border-2 border-black h-64 w-72">
                <h1 className="text-3xl font-bold text-center my-10">Leaderboard</h1>
                {Object.keys(leaderboardData).length > 0 ? (
                    leaderboardData.map((user, index) => (
                        <div key={index}>
                            <p>{user.address}: {user.tokens} tokens</p>
                        </div>
                    ))
                ) : (
                    <p>No leaderboard data available</p>
                )}
            </div>
        </div>
    );
}

export default StudentPortal;
