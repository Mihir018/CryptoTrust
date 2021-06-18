pragma solidity ^0.8.0;

import "./ERC20.sol";

contract Token is ERC20 {
    //declaring the owner
    address private owner;

    //modifier for owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner required !!");
        _;
    }
    //taking parameter for initial supply
    constructor(uint _initialSupply) ERC20("Cryptokens","CRYPT") {
        owner = msg.sender;
        _mint(owner, _initialSupply);
    }

    function isOwner(address _address) public view returns(bool) {
        return owner == _address;
    }

    //withdraw money from contract
    function takeMoneyOut(uint _amount) public onlyOwner {
        //validation for voting...
        //checking whether the requested amount is less than available amount
        require(_amount <= address(this).balance, "Insufficient funds");
        address payable to = payable(owner);
        //sending the requested amount to owner
        to.transfer(_amount);
    }
}