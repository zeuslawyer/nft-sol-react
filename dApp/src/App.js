import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";

import { ethers } from "ethers";
import epicNFT from "./configs/EpicNFT.json";

import React from "react";

// Constants
const TWITTER_HANDLE = "zubinpratap";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

const App = () => {
  const [currentUserAccount, setCurrentUserAccount] = React.useState("");

  const checkWalletConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please login to Metamask!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      setCurrentUserAccount(accounts[0]);
    } else {
      console.warn("No authorized account found");
    }
  };

  React.useEffect(() => {
    checkWalletConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please login to Metamask!");
        return;
      }

      // Request accounts on wallet connect
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected! Account is: ", accounts[0]);
      setCurrentUserAccount(accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const mintNFT = async () => {
    const CONTRACT_ADDRESS = "0xDedE63890bffBFf8DD674f25BAa3C2779753C423";
    try {
      const { ethereum } = window;
      if (ethereum) {
        // Providers talk to ethereum nodes via a consistent interface to
        // standard Ethereum node functionality.
        // In my case, the provider will be from MetaMask, using metamask's nodes.
        const provider = new ethers.providers.Web3Provider(ethereum);

        // A Signer in ethers is an abstraction of an Ethereum Account,
        // which can be used to sign messages and transactions and send
        // signed transactions to the Ethereum Network to execute state changing operations.
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          epicNFT.abi,
          signer
        );

        let nftTx = await connectedContract.makeEpicNFT();
        await nftTx.wait();
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`
        );
      } else {
        console.error("ethereum object not found");
      }
    } catch (e) {
      console.error("error in mintNFT :", e);
    }
  };

  const disconnectWallet = async () => {
    setCurrentUserAccount("");
  };

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={() => {
        connectWallet();
      }}
    >
      Connect Your Wallet
    </button>
  );

  const renderMintNFTButton = () => (
    <button className="cta-button connect-wallet-button" onClick={mintNFT}>
      MINT NFT
    </button>
  );

  const renderLogout = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={disconnectWallet}
    >
      Disconnect Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Tongue-in-Cheek Lawyer Tokens. Discover your NFT today.
          </p>
          {currentUserAccount
            ? renderMintNFTButton()
            : renderNotConnectedContainer()}
          {currentUserAccount ? renderLogout() : null}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
