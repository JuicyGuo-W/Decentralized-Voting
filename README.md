# Decentralized Voting Platform

This project is a decentralized voting platform built on the Ethereum blockchain. It allows users to vote for candidates using a smart contract and a simple front-end interface built with React and MetaMask.

## Features

- **Smart Contract**: A Solidity-based voting contract deployed on the Ethereum blockchain, which allows secure and transparent voting.
- **Candidate List**: Displays all candidates with their current vote counts.
- **Voting**: Users can vote for their favorite candidate. Each user is restricted to one vote.
- **MetaMask Integration**: Users can connect to the platform using MetaMask, a popular Ethereum wallet.

## Prerequisites

- **Node.js** and **npm**: Make sure you have Node.js and npm installed on your machine.
- **MetaMask**: Install the MetaMask extension in your browser and connect to a supported test network (such as Sepolia or Goerli).
- **Ethereum Testnet Funds**: Use a faucet to obtain test ETH for deploying and interacting with the contract.

## Installation

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Configure the Smart Contract**:

    - Deploy the `Voting.sol` contract on a test network using Remix or Truffle.
    - Note the contract address and update it in the front-end code (`VotingApp.js` or `App.js`).

## Usage

1. **Start the React App**:

    ```bash
    npm start
    ```

2. **Open MetaMask**:

    - Connect your MetaMask to the appropriate test network.
    - Ensure you have some test ETH in your account.

3. **Connect to the Platform**:

    - Open `http://localhost:3000` in your browser.
    - Click "Connect Wallet" to connect MetaMask to the platform.
    - You should see a list of candidates along with their vote counts.

4. **Vote for a Candidate**:

**Admin View**:
   - Create proposals using the "Add Proposal" interface by specifying description, voting timeframe, and candidate details.
   - End proposals after voting has concluded and manage the overall proposal lifecycle.
**User View**:
   - View active proposals and their details.
   - Participate in voting by selecting a candidate and casting a vote.

## Project Structure

```
web3_latest
├── public
├── src
│   ├── components
│   │   ├── ui
│   │   │   ├── AddProposal.js  # Handles creation of new proposals
│   │   │   ├── ConnectWallet.js  # Manages wallet connections via MetaMask
│   │   │   ├── ProposalManagement.js  # Manages viewing and ending proposals
│   │   │   ├── Voting.js  # Handles voting interactions
│   ├── App.css  # Application-wide styling
│   ├── App.js  # Main application logic and routing
│   ├── config.js  # Blockchain and contract configuration
│   ├── index.js  # Entry point of the React application
│   └── voting.json  # Smart contract ABI for blockchain interaction
├── package.json  # Project dependencies
├── package-lock.json  # Lockfile for dependencies
├── README.md  # Project documentation
└── voting.sol  # Solidity smart contract
```

The `Voting` smart contract contains:

- **Candidate Structure**: Stores candidate ID, name, and vote count.
- **Vote Function**: Allows users to vote for a candidate and restricts users to one vote.
- **Event Logging**: Emits an event every time a vote is cast.

## Smart Contract Overview

The `voting.sol` smart contract serves as the backbone of this decentralized voting platform, implementing the following key functionalities:

- **Proposal Management**:
  - Add new proposals with parameters such as description, voting timeframe, and maximum voting capacity.
  - Retrieve proposal and candidate details, including vote counts and election status.

- **Voting**:
  - Securely cast votes for candidates, ensuring no duplicate voting.
  - Fetch results for specific proposals, showing vote distributions.

- **Ownership and Administration**:
  - Enable ownership transfer to a new contract administrator.
  - End elections and archive results for completed proposals.

Refer to the `voting.json` ABI for detailed interaction specifications and data structures to integrate the smart contract with the front end.