import React, { useState } from 'react';
<<<<<<< HEAD
import { Wallet } from 'lucide-react';

const ConnectWallet = ({ account, setAccount }) => {
  const [isConnecting, setIsConnecting] = useState(false);
=======
import { ethers } from 'ethers';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
>>>>>>> 31643035f797e5d704ab1a59c3a96ed54f42794f

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
<<<<<<< HEAD
        setIsConnecting(true);
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        const address = accounts[0];
        setAccount(address); // This sets the account in the parent App component
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setIsConnecting(false);
=======
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0]; // Use the first account
        setWalletAddress(address);
        console.log("Connected wallet:", address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
>>>>>>> 31643035f797e5d704ab1a59c3a96ed54f42794f
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

<<<<<<< HEAD
  const formatWalletAddress = (address) => {
    if (!address || address.length <= 11) return address;
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="connect-button"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? (
        <span>Connecting...</span>
      ) : (
        account ? formatWalletAddress(account) : "Connect Wallet"
      )}
    </button>
  );
};

export default ConnectWallet;
=======
  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
>>>>>>> 31643035f797e5d704ab1a59c3a96ed54f42794f
