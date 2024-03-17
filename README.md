# Before Deadline Token

## Technical Overview of DApp

Our Decentralized Application (DApp) revolutionizes the way students interact with their academic responsibilities and financial opportunities. Built on blockchain technology, our DApp enables students to earn cryptocurrency tokens by submitting assignments punctually. Here's an in-depth look at the technical aspects and features of our DApp:

# Features

1. **Token-Based Reward System:**
   - Students earn tokens for submitting assignments within deadlines, stored securely on the Ethereum blockchain.
   - Tokens act as digital assets, representing a student's reliability and adherence to deadlines.

2. **Financial Empowerment:**
   - Students achieve financial independence by earning cryptocurrency tokens directly through the DApp.
   - This financial model eliminates traditional barriers, allowing students to earn income without relying solely on non-technical jobs.

3. **Transparent Sorting Mechanism:**
   - Colleges and educational institutions can utilize the transparent nature of blockchain to sort students based on their token history.
   - Blockchain-based sorting ensures fairness and transparency in evaluating students' punctuality and reliability.

4. **Seamless Token Liquidity:**
   - Once students accumulate a certain number of tokens, they can seamlessly convert them into tradable cryptocurrencies or fiat currencies, enhancing liquidity.

# Future Developments

1. **Plagiarism Detection Integration:**
   - Our DApp will integrate a robust plagiarism detection mechanism to ensure the authenticity of submitted assignments.
   - Advanced AI algorithms will enhance plagiarism detection accuracy, providing assurance of originality.

2. **Industry Collaboration Opportunities:**
   - Collaborations with industry partners will enable students to tackle real-world challenges and bugs.
   - Students will earn rewards for successfully addressing issues, fostering skill development and industry engagement.

# Benefits of Blockchain Integration

- **Immutable Recordkeeping:** Blockchain ensures immutability of student token records, preventing tampering or manipulation.
- **Decentralization:** Decentralized nature eliminates the need for intermediaries, ensuring trust and transparency in reward distribution.
- **Smart Contract Automation:** Smart contracts automate token distribution and assignment submission verification, reducing administrative overhead.

By leveraging blockchain technology, our DApp empowers students academically and financially while fostering a transparent and merit-based academic ecosystem. Through continuous development and industry collaboration, we aim to provide students with valuable opportunities for growth and success.


## Prerequisites

- Node.js
- Express.js
- Solidity smart contract (BeforeDeadlineToken.sol)
- Web3.js

## Setup

1. **Install Dependencies:**
   ```bash
   npm install express web3
   ```

2. **Smart Contract:**
   - Deploy the Solidity smart contract (BeforeDeadlineToken.sol) to the Ethereum blockchain.
   - Obtain the contract address and ABI.

3. **Environment Variables:**
   - Create a `.env` file in the project directory with the following variables:
     ```dotenv
     RPC_URL=<Your Ethereum Node RPC URL>
     PRIVATE_KEY=<Your Ethereum Account Private Key>
     CONTRACT_ADDRESS=<Your Smart Contract Address>
     ```

## Running the App

1. **Start the Server:**
   ```bash
   node server.js
   ```
   The server will be running on port 3000 by default.

2. **Access the Web App:**
   Open your web browser and navigate to http://localhost:3000/.

## App Routes

- **/tasks (GET):**
  - Retrieves all tasks from the smart contract.

- **/tasks/:id (GET):**
  - Retrieves a specific task by its ID.

- **/tasks (POST):**
  - Creates a new task.
  - Expects JSON data: `title`, `description`, `deadline`.

- **/tasks/:id (PUT):**
  - Updates an existing task by its ID.
  - Expects JSON data: `title`, `description`, `deadline`.

- **/tasks/:id (DELETE):**
  - Deletes a task by its ID.

## Smart Contract Functions

- **createTask:**
  - Creates a new task with the specified details.

- **updateTask:**
  - Updates an existing task.

- **deleteTask:**
  - Deletes a task.
 
## Demo
 App - https://7134ce66-b31d-4424-b770-353940241f32-00-q7uce0e0h1xa.pike.replit.dev/
 Video - https://1aff813c-3360-4757-ac79-19a7978442ff-00-3iydrhpwyci7f.sisko.replit.dev

## Important Notes

- Ensure that the Ethereum node specified in `RPC_URL` is accessible and synchronized.
- The private key in `PRIVATE_KEY` must have sufficient Ether for gas fees.
- This documentation assumes a basic understanding of Ethereum, smart contracts, Express.js, and MongoDB.

## For Further Inquiries

Feel free to reach out with any questions or concerns:

Email: namitamunjal27@gmail.com
       

