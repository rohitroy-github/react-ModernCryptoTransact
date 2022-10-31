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

  // usestate for changing Form data >>>
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setformData((prevState) => ({...prevState, [name]: e.target.value}));
  };

  // function to check if Metatmask is connected ?
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

  // function to connect wallet VIA Metamask !
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

  // function to send Transaction !
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const {addressTo, amount, keyword, message} = formData;

        getEthereumContract();
        // const transactionsContract = createEthereumContract();
        // const parsedAmount = ethers.utils.parseEther(amount);

        // await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [
        //     {
        //       from: currentAccount,
        //       to: addressTo,
        //       gas: "0x5208",
        //       value: parsedAmount._hex,
        //     },
        //   ],
        // });

        // const transactionHash = await transactionsContract.addToBlockchain(
        //   addressTo,
        //   parsedAmount,
        //   message,
        //   keyword
        // );

        // setIsLoading(true);
        // console.log(`Loading - ${transactionHash.hash}`);
        // await transactionHash.wait();
        // console.log(`Success - ${transactionHash.hash}`);
        // setIsLoading(false);

        // const transactionsCount =
        //   await transactionsContract.getTransactionCount();

        // setTransactionCount(transactionsCount.toNumber());
        // window.location.reload();
      } else {
        console.log("No ethereum object");
      }
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
    <TransactionContext.Provider
      value={{
        // transactionCount,
        connectWallet,
        // transactions,
        currentAccount,
        // isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
