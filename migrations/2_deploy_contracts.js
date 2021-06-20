const Token = artifacts.require("./Token.sol");
const TokenSale = artifacts.require("./TokenSale.sol");
const KYC = artifacts.require("./KYC.sol");
const Voting = artifacts.require("./Voting.sol");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(Voting);
  await deployer.deploy(KYC);
  await deployer.deploy(Token, process.env.INITIAL_TOKENS, Voting.address);
  await deployer.deploy(
    TokenSale,
    1,
    addr[0],
    Token.address,
    KYC.address,
    Voting.address
  );
  let tokenInstance = await Token.deployed();
  await tokenInstance.transfer(TokenSale.address, process.env.INITIAL_TOKENS);
};
