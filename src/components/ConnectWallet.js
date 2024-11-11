import React, { useState } from 'react';
import { ethers } from 'ethers'; 

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log("Connected wallet:", address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
