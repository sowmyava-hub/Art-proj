import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SellAnItem.css';
import Web3 from "web3";
import configuration from './ART.json';
const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


function ItemList() {
  // Set up some dummy data for the items
  const [items, setItems] = useState([
    { name: 'Item 1', price: 10 },
    { name: 'Item 2', price: 20 },
    { name: 'Item 3', price: 30 },
  ]);

  // Function to handle changing the price of an item
  const handleChangePrice = (index, newPrice) => {
    // Create a copy of the items array
    const newItems = [...items];
    // Update the price of the item at the specified index
    newItems[index].price = newPrice;
    // Update the state with the new items array
    setItems(newItems);
  };

  // Styles for the item boxes
  const itemBoxStyles = {
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  // Styles for the item name
  const itemNameStyles = {
    fontSize: 24,
    fontWeight: 'bold',
    margin: '8px 0',
  };

  // Styles for the item price
  const itemPriceStyles = {
    fontSize: 18,
    color: '#007aff',
    margin: '8px 0',
  };

  // Styles for the buttons
  const buttonStyles = {
    backgroundColor: '#007aff',
    color: 'white',
    borderRadius: 8,
    padding: '8px 16px',
    margin: '8px',
    border: 'none',
    fontSize: 16,
  };

  // Render the list of items
  return (
    <div>
      <h1>Item List</h1>
      {items.map((item, index) => (
        <div key={index} style={itemBoxStyles}>
          <h2 style={itemNameStyles}>{item.name}</h2>
          <p style={itemPriceStyles}>Price: ${item.price}</p>
          <button style={buttonStyles} onClick={() => alert(`Buy now: ${item.name}`)}>Buy Now</button>
          <button style={buttonStyles} onClick={() => handleChangePrice(index, item.price + 10)}>Change Price</button>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
