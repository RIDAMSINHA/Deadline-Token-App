import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CONTRACT_ABI from "./Contract/MainToken.json";

// Load environment variables
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const RPC_URL = process.env.REACT_APP_RPC_URL;
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const Wallet = () => {
    const [availableToken, setAvailableToken] = useState("");

    // Function to connect to Ethereum network
    const connectToBlockchain = async () => {
        try {
            // Request account access if needed
            const wallet = new ethers.Wallet(PRIVATE_KEY);
            const contractAddress = CONTRACT_ADDRESS;

            // Set the provider for the wallet
            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const connectedWallet = wallet.connect(provider);

            const contract_abi = CONTRACT_ABI.abi;
            const Main_Contract = new ethers.Contract(contractAddress, contract_abi, connectedWallet);

            console.log('Ether.js initialized successfully');

            // Call contract function to get user's available token balance
            const token = sessionStorage.getItem('Sub_add');
            const balance = await Main_Contract.balanceOf(token);
            setAvailableToken(balance.toString());
        } catch (error) {
            console.error("Error connecting to blockchain:", error);
        }
    };

    useEffect(() => {
        connectToBlockchain();
    }, []);

    const handleRefresh = async () => {
        // Refresh the wallet balance
        connectToBlockchain();
    };

    return (
        <html>
            <head>
                {/* Head elements */}
            </head>
            <body style={{ marginTop: "100px" }}>
                <h1 style={{ color: "#2196F3", fontFamily: "Amaranth", textAlign: "center" }}>WALLET</h1>
                <br />

                <div style={{ background: "#D6D6D6", fontFamily: "amar", fontWeight: "bold", fontSize: "35px", padding: "30px", borderRadius: "50px 50px 50px 50px", width: "800px", marginLeft: "300px", paddingLeft: "100px" }}>
                    <p>Available Token: {availableToken}</p>
                </div>

                <h2 style={{ color: "#2196F3", fontFamily: "Amaranth", textAlign: "center" }}>
                    <button onClick={handleRefresh} style={{ marginLeft: "48%", marginTop: "20px" }}>Refresh</button>
                </h2>
            </body>
        </html>
    );
}

export default Wallet;
