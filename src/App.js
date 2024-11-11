import React from 'react';
import ConnectWallet from './components/ConnectWallet';

function App() {
  return (
    <div className="App">
      <h1>Decentralized Voting Platform</h1>
      <ConnectWallet />
    </div>
  );
}
console.log("App Loaded")
export default App;
