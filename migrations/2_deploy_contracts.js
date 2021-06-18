const Token = artifacts.require("./Token.sol");
require("dotenv").config({ path: "../.env" });

module.exports = function (deployer) {
  deployer.deploy(Token, process.env.INITIAL_TOKENS);
};
