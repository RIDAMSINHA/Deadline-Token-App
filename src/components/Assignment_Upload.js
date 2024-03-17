import React, { useRef, useState } from "react";
import { ethers } from 'ethers';
import CONTRACT_ABI from "./Contract/MainToken.json"

const AssignmentUpload = () => {

    const readFileAsText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Set up event listeners for when the file is loaded successfully or when an error occurs
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);

            // Read the file as text
            reader.readAsText(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData instance
        const formData = new FormData(e.target);

        // Get the values from the form inputs
        const subject = formData.get('subject');
        const document = formData.get('document');
        const deadlineDate = formData.get('deadlineDate');
        const deadlineTime = formData.get('deadlineTime');
        const tokenValue = formData.get('tokenValue');

        // Read the contents of the file as a string using the readFileAsText function
        const fileContents = await readFileAsText(document);

        // Convert deadline date and time to Unix timestamp
        const deadlineTimestamp = new Date(`${deadlineDate}T${deadlineTime}`).getTime() / 1000;

        try {
            console.log('Initializing Ether.js...');

            const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

            // Set the provider for the wallet
            const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
            const connectedWallet = wallet.connect(provider);

            const contract_abi = CONTRACT_ABI.abi;
            const Main_Contract = new ethers.Contract(contractAddress, contract_abi, connectedWallet);

            console.log('Ether.js initialized successfully');

            try {
                console.log( "DEAD:", deadlineTimestamp, "SUB:", subject, "TOK:", tokenValue);
                const deploySubContractResult = await Main_Contract.addAssignment(fileContents, deadlineTimestamp, subject, tokenValue);
                const receipt = await deploySubContractResult.wait();
                console.log('Subcontract successfully deployed.', receipt);
            } catch (error) {
                console.error('Error:', error.message);
            }
        } catch (error) {
            console.error('Error using private key:', error.message);
            console.log(error);
        }
    };

    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body style={{marginTop:"50px",fontFamily:"Amaranth",fontWeight:"bold",fontSize:"20px"}}>
                <h1  style={{
                color: "#2196F3",
                fontFamily: "Amaranth",
                textAlign: "center",
              }}>Assignments Upload</h1>
               
                <form onSubmit={handleSubmit} 
                style={{background:"#D6D6D6",height:"350px", borderRadius:"50px 50px 50px 50px",padding:"100px",fontFamily:"Amaranth",fontWeight:"bold",fontSize:"20px",margin:"200px",marginTop:"20px",paddingLeft:"200px"}}>
                    <tr>
                        <td style={{width:"400px"}}><label>Subject:</label></td>
                        <td> <select name="subject" style={{height:"35px",borderRadius:"50px 50px 50px 50px",width:"200px",fontSize:"20px",padding:"5px",}}>
                        <option>Select Subject</option>
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Maths</option>
                        <option>Science</option>
                    </select>
                    <br /><br /></td>
                    </tr>

                    <tr>
                        <td><label>Upload Document:</label></td>
                        <td><input type="file" name="document" placeholder="upload document" style={{height:"35px",borderRadius:"50px 50px 50px 50px",width:"200px",fontSize:"20px",padding:"5px",}} />
                    <br /><br /></td>
                    </tr>

                    <tr>
                        <td><label>Choose a deadline:   </label></td>
                        <td> <input type="date" name="deadlineDate" style={{height:"35px",borderRadius:"50px 50px 50px 50px",width:"200px",fontSize:"20px",padding:"5px",}}/> <br/><br /></td>
                    </tr>

                    <tr>
                        <td> <label>Choose a deadline time:   </label></td>
                        <td><input type="time" name="deadlineTime" style={{height:"35px",borderRadius:"50px 50px 50px 50px",width:"200px",fontSize:"20px",padding:"5px",}}/>
                    <br /><br /></td>
                    </tr>

                    <tr>
                        <td><label>Enter Token Value:</label></td>
                        <td><input type="text" name="tokenValue" placeholder="Enter Token Value" style={{height:"35px",borderRadius:"50px 50px 50px 50px",width:"200px",fontSize:"20px",padding:"5px",}}/>
                    <br /><br /></td>
                    </tr>
                    
                   
                    
                    
                    
                   
                   
                    
                    
                    <button type="submit" style={{fontFamily:"Amar",fontSize:"25px",fontWeight:"Bold",backgroundColor:"#03A9F4", padding:"15px", borderRadius:"100px 100px 100px 100px", border:"none", width:"450px",cursor:"pointer"}}>Submit</button>
                    
                </form>
            </body>
        </html>
    );
};

export default AssignmentUpload;
