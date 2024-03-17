import React, { useState } from 'react';
import { ethers } from 'ethers'; 
import CONTRACT_ABI from "./Contract/SubContract.json";

const SubmitAssignment = ({ subContractAddress }) => {
    const [uniqueId, setUniqueId] = useState('');
    const [answerDetails, setAnswerDetails] = useState('');
    const [password, setPassword] = useState('');
    const [uuid, setUuid] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
            const contractAddress = sessionStorage.getItem('Sub_add');

            // Set the provider for the wallet
            const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
            const connectedWallet = wallet.connect(provider);

            const contract_abi = CONTRACT_ABI.abi;

            // Instantiate the SubContract contract
            const subContract = new ethers.Contract(contractAddress, contract_abi, connectedWallet);
            console.log(uniqueId, answerDetails, password, uuid);

            console.log('Ether.js initialized successfully');
            // Call the submitAssignment function on the contract
            const tx = await subContract.submitAssignment(uniqueId, answerDetails, password, uuid);

            // Wait for the transaction to be confirmed
            await tx.wait();

            // Reset form fields
            // setUniqueId('');
            // setAnswerDetails('');
            // setPassword('');
            // setUuid('');

            // Provide user feedback on successful submission
            alert('Assignment submitted successfully!');
        } catch (error) {
            console.error('Error submitting assignment:', error.message);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{background:"#D6D6D6", padding:"100px",margin:"200px",marginTop:"20px",borderRadius:"50px 50px 50px 50px", fontFamily:"amar"}}>
            <h2 style={{fontSize:"30px",textAlign:"center"}}>Submit Assignment</h2>
            <form onSubmit={handleSubmit}
            style={{fontSize:"25px", marginLeft:"50px",paddingLeft:"100px"}}>
                <tr>
                    <td style={{width:"400px"}}><label>
                    Unique ID:
                    
                </label></td>
                    <td><input type="text" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)}  style={{
                      backgroundColor: "#fff",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }} /></td>
                </tr>
                <br/>
                
                
                <tr>
                    <td style={{width:"400px"}}>
                    <label>
                    Answer Details:
                    
                </label>
                    </td>
                    <td>
                    <input type="text"  style={{
                      backgroundColor: "#fff",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }} value={answerDetails} onChange={(e) => setAnswerDetails(e.target.value)} />
                    </td>
                </tr>
                
                    <br/>

                <tr>
                    <td style={{width:"400px"}}><label >
                    Password:
                    
                </label></td>
                    <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  style={{
                      backgroundColor: "#fff",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }}/></td>
                </tr>
                
                    <br/>

                <tr>
                    <td style={{width:"400px"}}><label>
                    UUID:
                    
                </label></td>
                    <td><input type="text"  style={{
                      backgroundColor: "#fff",
                      padding: "25px",
                      borderRadius: "100px 100px 100px 100px",
                      border: "none",
                      fontSize: "15px",
                    }} value={uuid} onChange={(e) => setUuid(e.target.value)} /></td>
                </tr>
                
                <br />
                
                <br />
                <button type="submit" disabled={loading}  style={{fontFamily:"Amar",fontSize:"25px",fontWeight:"Bold",backgroundColor:"#03A9F4", padding:"15px", borderRadius:"100px 100px 100px 100px", border:"none", width:"450px",cursor:"pointer",marginLeft:"90px" }}>Submit</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default SubmitAssignment;
