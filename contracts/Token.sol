pragma solidity ^0.8.0;

import "./ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("Crypt","CRYPT") {

    }
}