import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import barnithWalletAbi from "../artifacts/contracts/Assessment.sol/BarnithWallet.json" // Updated contract ABI

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const depositAmount = useRef();
  const depositAddress = useRef();
  const withdrawAmount = useRef();
  const withdrawAddress = useRef();

  const contractAddress = "0xc4c7A6844B2BCfa025745cDB34A192776196c952";
  const walletABI = barnithWalletAbi.abi; // Updated contract ABI

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once the wallet is set, get a reference to the deployed contract
    getWalletContract();

    alert("Account connected");
  };

  const getWalletContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const walletContract = new ethers.Contract(contractAddress, walletABI, signer);

    setWallet(walletContract);
  };

  const getBalance = async () => {
    if (wallet) {
      try {
        const walletBalance = await wallet.get_Contract_Balance();
        setBalance(walletBalance.toNumber());
        console.log(walletBalance);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deposit = async () => {
    const amt = Number(depositAmount.current.value);
    const addr = depositAddress.current.value;

    if (wallet) {
      try {
        let tx = await wallet.deposit_Tokens(addr, amt);
        await tx.wait();
        getBalance();
        alert("Tokens Deposited");

        depositAmount.current.value = depositAddress.current.value = "";
      } catch (error) {
        console.log(error);
        alert("Transaction Reverted");
      }
    }
  };

  const withdraw = async () => {
    const withdrawAmt = Number(withdrawAmount.current.value);
    const addr = withdrawAddress.current.value;
    
    if (wallet) {
      try {
        let tx = await wallet.withdraw_Tokens(addr,withdrawAmt);
        await tx.wait();
        getBalance();
        alert("Tokens Withdrawn");

        withdrawAmount.current.value =  
        withdrawAddress.current.value = "";
      } catch (error) {
        console.log(error);
        alert("Transaction Reverted");
      }
    }
  };

  const buyNFT = async () => {
    const nftNumber = 1;

    if (wallet) {
      try {
        let tx = await wallet.buyNFT(nftNumber);
        await tx.wait();
        getBalance();
        alert("NFT Purchased");
      } catch (error) {
        console.log(error);
        alert("Transaction Reverted");
      }
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    alert("Address copied");
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (wallet) {
      getBalance();
    }
  }, [wallet]);

  return (
    <main className="container">
      <header>
        <h1>AVAX Module 2 Project</h1>
      </header>
      <div className="content">
        {!account ? (
          <button onClick={connectAccount}>Connect MetaMask wallet</button>
        ) : (
          <>
            <div className="button-group">
              <div>
                <button onClick={copyAddress}>Copy Address</button>
              </div>
              <div className="btn">
                <button onClick={deposit}>Deposit Tokens</button>
                <input type="password" ref={depositAddress} placeholder="Enter Receiver's Address" />
                <input type="number" ref={depositAmount} placeholder="Enter Deposit Amount" />
              </div>
              <div className="btn">
                <button onClick={withdraw}>Withdraw Tokens</button>
                <input type="password" ref={withdrawAddress} placeholder="Enter Withdraw Address"></input>
                <input type="number" ref={withdrawAmount} placeholder="Enter Withdraw Amount" />
              </div>
              <div>
                <button onClick={buyNFT}>Buy NFT</button>
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .container {
          text-align: center;
          padding-top: 8em;
          font-family: 'Arial', sans-serif;
          background-color: #1a1a1a;
          width: 100vw;
          height: 100vh;
          color: #ffffff;
          font-size: 1.3rem;
        }

        h1 {
          color: #ff6b6b;
        }

        .btn {
          display: flex;
          gap: 0.5em;
        }

        header {
          margin-bottom: 20px;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        input {
          padding: 0.5em;
          border-radius: 0.4em;
          border: 1px solid #6366F1;
          margin-right: 0.5em;
          background-color: #2c2c2c;
          color: #ffffff;
        }

        input::placeholder {
          color: #ffffff;
        }

        .button-group {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5em;
        }

        button {
          display: block;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 0.4em;
          width: 20vw;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </main>
  );
}
