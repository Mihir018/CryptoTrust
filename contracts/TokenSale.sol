pragma solidity ^0.8.0;

import "./Crowdsale.sol";
import "./KYC.sol";
import "./Voting.sol";

contract TokenSale is Crowdsale {
    KYC kyc;
    Voting vtc;
    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KYC _kyc,
        Voting _vtc
    )
    Crowdsale(rate, wallet, token) {
        kyc = _kyc;
        vtc = _vtc;
    }
    function _preValidatePurchase(address beneficiary,uint256 weiAmount) internal override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(msg.sender), "Kyc not completed, purchase not allowed");
        vtc.contribute(msg.sender);
    }
    //to return total amount of wei collected
    function totalAmountCollected() public view returns(uint) {
        return weiRaised();
    } 
    function balanceOfContract() public view returns(uint) {
        return address(this).balance;
    }

    //to check whether KYC is completed or not
    function isKycVerified(address _address) public view returns(bool) {
        return kyc.kycCompleted(_address);
    }

    //for creating a request
    function makeMoneyRequest(string memory _description, uint _value, address payable _recipient) public {
        //executing suitable function
        vtc.createRequest(_description, _value, _recipient);
    }

    //for accepting the request by investor
    function voteYes(uint index) public {
        vtc.approveRequest(index);
    }

    //for getting the final results
    function getVoteResult(uint index) public returns(bool){
        return vtc.finalizeRequest(index);
    }

    //getting all the request
    function getRequestDescription(uint index) public view returns(string memory) {
        return vtc.getRequestDescription(index);
    }
    function getRequestValue(uint index) public view returns(uint) {
        return vtc.getRequestValue(index);
    }
    function getRequestRecipient(uint index) public view returns(address payable) {
        return vtc.getRequestRecipient(index);
    }
    function getRequestComplete(uint index) public view returns(bool) {
        return vtc.getRequestComplete(index);
    }
    function getRequestApprovalCount(uint index) public view returns(uint) {
        return vtc.getRequestApprovalCount(index);
    }

    //make kyc request
    function makeKycRequest(address _address) public {
        kyc.kycRequest(_address);
    }                                                                                                                                                                                                                           
}