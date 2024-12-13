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

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/Decentralized-Voting.git
    cd Decentralized-Voting
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure the Smart Contract**:

    - Deploy the `Voting.sol` contract on a test network using Remix or Truffle.
    - Note the contract address and update it in the front-end code (`VotingApp.js` or `App.js`).

4. **Set Up Infura (Optional)**:

    If connecting to a network like Sepolia via Infura, create an account on [Infura](https://infura.io/) and obtain an API key. Use this API key to connect to the network.

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

## Usage

1. **Connect Wallet**: Navigate to the homepage and connect your MetaMask wallet using the "Connect Wallet" button.
2. **Create Proposal**: Use the "Add Proposal" feature to specify proposal details, including description and voting timeframes.
3. **Vote**: Participate in any active proposal by casting your vote for or against candidates.
4. **Manage Proposals**: View detailed information about proposals or end an active proposal through the management interface.

## Smart Contract Overview

The `voting.sol` smart contract underpins the decentralized voting platform. It includes the following key functionalities:

- **Proposal Management**:
  - Add new proposals with voting parameters (description, start and end times, etc.).
  - Retrieve proposal details, including candidates and their vote counts.

- **Voting**:
  - Cast votes for specific candidates within an active proposal.
  - Prevent double voting by tracking voters' participation.

- **Ownership and Administration**:
  - Transfer contract ownership to a new administrator.
  - End proposals and archive results.

Refer to the `voting.json` ABI for detailed interaction specifications and data structures.
