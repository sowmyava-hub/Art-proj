import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SellAnItem.css';
import Web3 from "web3";
import configuration from './ART.json';
const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const SellAnItem = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const listItemForSale = async (tokenId, price) => {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];
    await contract.methods.listItemForSale(tokenId, price).send({ from: account });
    console.log("Item listed for sale successfully");
    
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };




  const handleSubmit = (event) => {
    event.preventDefault();
    listItemForSale(title, price);
  };
  
  
  return (
    <div className="form-container">
      <h1>Sell An Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Item Address </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            style={{ width: "200px", height: "20px" }}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Set Item Price </label>
          <input
            type="price"
            id="price"
            name="price"
            value={price}
            style={{ width: "200px", height: "20px" }}
            onChange={handlePriceChange}
          />
        </div>
        <button className="submit" type="submit">
           Submit
        </button>

      
      </form>
      <br />
      <button onClick={() => navigate(-1)}>Back to Home</button>
    </div>
  );
};


export default SellAnItem;

