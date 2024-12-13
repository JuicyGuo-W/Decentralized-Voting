import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import ProposalManagement from './components/ProposalManagement';
import Voting from './components/Voting';
import './App.css';  // Make sure this is imported
import { ethers } from 'ethers';
import { contractAddress, contractABI } from './config';
const Alert = ({ title, description, variant }) => (
  <div className={`card ${variant === 'destructive' ? 'bg-red-900' : 'bg-blue-900'} mb-4`}>
    <h3 className="font-bold">{title}</h3>
    <p>{description}</p>
  </div>
);

const App = () => {
  const [account, setAccount] = useState('');
  const [role, setRole] = useState(null);
  const [alert, setAlert] = useState(null);
  const [proposalNum, setProposalNum] = useState('');
  const [proposal, setProposal] = useState(null);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [loading, setLoading] = useState(false);

  const showAlert = (title, description, variant = "default") => {
    setAlert({ title, description, variant });
    setTimeout(() => setAlert(null), 5000);
  };

const handleFetchProposal = async () => {
    if (!proposalNum) {
        showAlert('Error', 'Please enter a proposal number', 'destructive');
        return;
    }

    setLoading(true);
    try {
        if (!window.ethereum) {
            showAlert('Error', 'Please install MetaMask!', 'destructive');
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const proposalData = await contract.getProposal(proposalNum);
        setProposal({
            id: proposalNum,
            description: proposalData.description,
            startTime: new Date(Number(proposalData.electionStartTime) * 1000).toLocaleString(),
            endTime: new Date(Number(proposalData.electionEndTime) * 1000).toLocaleString(),
            totalVotes: proposalData.totalVoteCount.toString(),
            isActive: proposalData.isActive,
            maxVotingNum: proposalData.maxVotingNum.toString()  // Add this line
        });

        showAlert('Success', 'Proposal fetched successfully');
    } catch (error) {
        console.error('Error fetching proposal:', error);
        showAlert('Error', 'Failed to fetch proposal', 'destructive');
    } finally {
        setLoading(false);
    }
};

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setProposal(null);
    setProposalNum('');
    setShowCreateProposal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-container">
          <div className="logo">V</div>
          <h1 className="logo">Decentralized Voting</h1>
          <ConnectWallet account={account} setAccount={setAccount} />
        </div>
      </header>

      <main className="main-content">
        {account ? (
          !role ? (
            // Centered Role Selection
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh'
            }}>
              <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="proposal-title mb-6 text-center">Select Your Role</h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  <button
                    className="button vote-for"
                    style={{ width: '200px' }}
                    onClick={() => handleRoleChange('admin')}
                  >
                    I'm an Admin
                  </button>
                  <button
                    className="button vote-against"
                    style={{ width: '200px' }}
                    onClick={() => handleRoleChange('voter')}
                  >
                    I'm a Voter
                  </button>
                </div>
              </div>
            </div>
          ) : (

            <div className="proposal-list">
              <div className="card">
                <h2 className="proposal-title">
                  Currently acting as: {role === 'admin' ? 'Admin' : 'Voter'}
                </h2>
                <button
                  className="button"
                  onClick={() => handleRoleChange(null)}
                >
                  Change Role
                </button>
              </div>

              <div className="card">
                <h2 className="proposal-title">Fetch Proposal</h2>
                <div className="flex gap-4 mb-4">
                  <input
                    type="number"
                    className="input-field"
                    placeholder="Enter proposal number"
                    value={proposalNum}
                    onChange={(e) => setProposalNum(e.target.value)}
                  />
                  <button
                    className="button"
                    onClick={handleFetchProposal}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loading-spinner inline-block mr-2" />
                    ) : 'Fetch'}
                  </button>
                </div>

                {proposal && (
                  <div className="proposal-card">
                    <h3 className="proposal-title">Proposal Details</h3>
                      <div className="proposal-description">
                          <p><strong>Proposal ID:</strong> {proposal.id}</p>
                          <p>Description: {proposal.description}</p>
                          <p>Start Time: {proposal.startTime}</p>
                          <p>End Time: {proposal.endTime}</p>
                          <p>Total Votes: {proposal.totalVotes}</p>
                          <p>Status: {proposal.isActive ? 'Active' : 'Inactive'}</p>
                          <p>Max Voting Per voter: {proposal.maxVotingNum}</p>
                      </div>
                  </div>
                )}
              </div>

              {role === 'admin' ? (
                <div className="card">
                  <h2 className="proposal-title">Admin Actions</h2>
                  {showCreateProposal ? (
                    <ProposalManagement />
                  ) : (
                    <button
                      className="button vote-for"
                      onClick={() => setShowCreateProposal(true)}
                    >
                      Create New Proposal
                    </button>
                  )}
                </div>
              ) : (
                proposal && (
                  <div className="card">
                    <h2 className="proposal-title">Vote on Proposal</h2>
                    <Voting proposalNum={proposalNum} />
                  </div>
                )
              )}
            </div>
          )
        ) : (
          <div className="card text-center">
            <h2 className="proposal-title">Welcome to Decentralized Voting</h2>
            <p className="proposal-description">Please connect your wallet to continue</p>
          </div>
        )}

        {alert && (
          <Alert 
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
          />
        )}
      </main>
    </div>
  );
};

export default App;