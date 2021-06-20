pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./Voting.sol";
contract Token is ERC20 {
    //declaring the owner
    address private owner;
    Voting vtc;
    //modifier for owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner required !!");
        _;
    }
    //taking parameter for initial supply
    constructor(uint _initialSupply, Voting _vtc) ERC20("Cryptokens","CRYPT") {
        owner = msg.sender;
        vtc = _vtc;
        _mint(owner, _initialSupply);
    }

    function isOwner(address _address) public view returns(bool) {
        return owner == _address;
    }

    function getBalance() public returns(uint) {
        return address(this).balance;
    }
    //withdraw money from contract
    function takeMoneyOut(uint index, uint _amount) public onlyOwner {
        //validation for voting...
        require(vtc.finalizeRequest(index), "Request is not being granted !!");
        //checking whether the requested amount is less than available amount
        require(_amount <= address(this).balance, "Insufficient funds");
        address payable to = payable(owner);
        //sending the requested amount to owner
        to.transfer(_amount);
    }
}