import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import logo from './logo.png';
import Web3 from "web3";
import configuration from './ART.json';


const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;


const web3 = new Web3(Web3.givenProvider || 'http://127.0.0:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const Home = (props) => {
  const navigate = useNavigate();
  const accountRef = useRef(null);
  const [account, setAccount] = useState('');

  const getAccount = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  }

  useEffect(() => {
    getAccount();
  }, []);


  const handleMintToken = async () => {
    const tokenId = await contract.methods.mint(account, "https://example.com/token.json").send({ from: account });
    console.log("Account id:",account);

    console.log("Token ID:",tokenId);
  }
  

  const handleListItemsForSale = async () => {
    const tokenIds = await contract.methods.getAllItemsForSale().call();
    //navigate('/listings', { state: { tokenIds } });
    console.log("Token IDs:",tokenIds);

  };

  const handleBuyItem = async (tokenId) => {
    console.log("Account id:",account);
    await contract.methods.buyItem(13).send({ from: account });

  };
  

  return (
    <div className="container">
      {/* Image */}
      <img src={logo} alt="logo" className="logo" />

      {/* Account */}
      <div ref={accountRef}>{account}</div>

      {/* Buttons */}
      <div className="button-container">
        <button className="button" onClick={handleMintToken}>
          Mint Token
        </button>
        <button className="button" onClick={() => navigate("/sell")}>
          Sell an Item
        </button>
      
        {/* <button className="button" onClick={handleListItemsForSale}> */}
        <button className="button" onClick={() => navigate("/list")}>

          List all items for sale
        </button>

        <button className="button" onClick={() => navigate("/blog")}>
          Change price of an item
        </button>

        <button className="button" onClick={() => handleBuyItem(1)}>
          Buy Item
        </button>
      </div>
    </div>
  );
};

export default Home;
