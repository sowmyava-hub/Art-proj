//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ART is ERC721URIStorage, Ownable {
    uint256 public nextTokenId = 1;
    IERC20 public artToken;
    uint256 public transactionFee = 2; // 2% transaction fee

    mapping(uint256 => uint256) public tokenPrices;

    event TokenListed(uint256 indexed tokenId, uint256 price);
    event TokenSold(uint256 indexed tokenId, uint256 price, address indexed seller, address indexed buyer);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        artToken = IERC20(msg.sender);
        
    }

    // mint function to mint a unique item
    // generates unique tokenId's for each item and returns the tokenId
    function mint(address to, string memory tokenURI) external returns (uint256) {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        nextTokenId++;
        return tokenId;
    }

    // listItemForSale function list a list for sale
    // Only an onwer of an item can list it for sale
    function listItemForSale(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of the item");
        require(price > 0, "Price must be greater than zero");
        tokenPrices[tokenId] = price;
        emit TokenListed(tokenId, price);
    }

    // buyItem function lets you buy an item from the market/gallery
    function buyItem(uint256 tokenId) external {
        uint256 price = tokenPrices[tokenId];
        require(price > 0, "Item is not for sale");
        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "You cannot buy your own item");
        artToken.transferFrom(msg.sender, address(this), price * transactionFee / 100); // Take transaction fee
        artToken.transferFrom(msg.sender, seller, price * (100 - transactionFee) / 100); // Send payment to seller
        _transfer(seller, msg.sender, tokenId);
        tokenPrices[tokenId] = 0;
        emit TokenSold(tokenId, price, seller, msg.sender);
    }

    // setTransactionFee function allows the onwer of the item to set the transaction fee
    function setTransactionFee(uint256 _transactionFee) external onlyOwner {
        require(_transactionFee <= 10, "Transaction fee must be less than or equal to 10%");
        transactionFee = _transactionFee;
    }

    // setItemPrice function lets you set price value for a particular item
    function setItemPrice(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of the item");
        tokenPrices[tokenId] = price;
    }

    // getItemPrice function fetches the price value of a product
    function getItemPrice(uint256 tokenId) external view returns (uint256) {
        return tokenPrices[tokenId];
    }

    // getAllItemsForSale function lists all the items available for sale
    // lists all the tokenId's available for sale
    function getAllItemsForSale() external view returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](nextTokenId - 1);
        uint256 count = 0;
        for (uint256 i = 1; i < nextTokenId; i++) {
            if (tokenPrices[i] > 0) {
                tokenIds[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = tokenIds[i];
        }
        return result;
    }

}