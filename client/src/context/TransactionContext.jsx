// Blockchain Connection
// Main Blockchain/ Metamask connection

import React, {useEffect, useState} from "react";

import {ethers} from "ethers";

import {contractABI, contractAddress} from "../utils/constants";
import {AiFillFileAdd} from "react-icons/ai";

export const TransactionContext = React.createContext();

const {ethereum} = window;

// Fetch ethereum contract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // check
  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState("");

  // Check if Metatmask is connected ?
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({method: "eth_accounts"});

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Connect wallet VIA Metamask !
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // Check at every load/ reload ?
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{connectWallet, currentAccount}}>
      {children}
    </TransactionContext.Provider>
  );
};
