pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
contract KYC is Ownable{
    mapping(address => bool) allowed;
    address[] public pending;
    uint public pendingLength;
    function kycRequest(address _address) public {
        pending.push(_address);
        pendingLength++;
    }
    function setKycComplete(address _address) public onlyOwner{
        allowed[_address] = true;
    }

    function setKycRevoked(address _address) public onlyOwner{
        allowed[_address] = false;
    }

    function kycCompleted(address _address) public view returns(bool) {
        return allowed[_address];
    }

}