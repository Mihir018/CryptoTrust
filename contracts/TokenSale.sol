pragma solidity ^0.8.0;

import "./Crowdsale.sol";
import "./KYC.sol";

contract MyTokenSale is Crowdsale {
    KYC kyc;
    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KYC _kyc
    )
    Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }
    function _preValidatePurchase(address beneficiary,uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(msg.sender), "Kyc not completed, purchase not allowed");
    }
    //to return total amount of wei collected
    function totalAmountCollected() public view returns(uint) {
        return weiRaised();
    } 

    //to check whether KYC is completed or not
    function isKycVerified(address _address) public view returns(bool) {
        return kyc.kycCompleted(_address);
    }
}