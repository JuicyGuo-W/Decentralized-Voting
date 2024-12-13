import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

const ConnectWallet = ({ account, setAccount }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
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
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

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