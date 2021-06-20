const MyTokenSale = artifacts.require("TokenSale");
const Token = artifacts.require("Token");
const KycContract = artifacts.require("KYC");
const VotingContract = artifacts.require("Voting");

const chai = require("./setupChai");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale test", async (accounts) => {
  const [deployerAccount, recipent, anotherAccount, fourthAcc, fifthAcc] =
    accounts;
  let tokenSaleInstance;
  let votingInstance;
  let kycInstance;
  describe("for kyc and normal buying of tokens", async () => {
    it("should not have any token in my deployerAccount", async () => {
      let instance = await Token.deployed();
      return expect(
        instance.balanceOf(deployerAccount)
      ).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in TokenSale smart contract by default", async () => {
      let instance = await Token.deployed();
      let totalSupply = await instance.totalSupply();
      return expect(
        instance.balanceOf(MyTokenSale.address)
      ).to.eventually.be.a.bignumber.equal(new BN(totalSupply));
    });

    it("should be possible to buy token", async () => {
      let tokenInstance = await Token.deployed();
      let tokenSaleInstance = await MyTokenSale.deployed();
      let kycContractInstance = await KycContract.deployed();
      let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
      await tokenSaleInstance.makeKycRequest(recipent, {
        from: recipent,
      });
      await tokenSaleInstance.makeKycRequest(anotherAccount, {
        from: anotherAccount,
      });
      await tokenSaleInstance.makeKycRequest(deployerAccount, {
        from: deployerAccount,
      });
      await kycContractInstance.setKycComplete(deployerAccount, {
        from: deployerAccount,
      });
      let expectedKycRequests = [recipent, anotherAccount, deployerAccount];
      let results = [];
      let totalLength = await kycContractInstance.pendingLength();
      for (var i = 0; i < totalLength; i++) {
        var val = await kycContractInstance.pending(i);
        results.push(val);
      }
      expect(results.join(",")).to.be.equal(expectedKycRequests.join(","));
      expect(
        tokenSaleInstance.sendTransaction({
          from: deployerAccount,
          value: web3.utils.toWei("1", "wei"),
        })
      ).to.eventually.be.fulfilled;
      //this operation takes more time to show up the respective balance
      console.log(await web3.eth.getBalance(tokenSaleInstance.address));
      setTimeout(async () => {
        return expect(
          tokenInstance.balanceOf(deployerAccount)
        ).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
      }, 200);
    });
  });
  beforeEach(async () => {
    tokenSaleInstance = await MyTokenSale.deployed();
    votingInstance = await VotingContract.deployed();
    kycInstance = await KycContract.deployed();
  });
  describe("for voting", () => {
    it("creating request", async () => {
      let description = "Buy wood";
      let amount = 1;
      let senderAddress = fifthAcc;
      await votingInstance.createRequest(description, amount, senderAddress);
      return expect(
        votingInstance.allRequestLength()
      ).to.eventually.be.a.bignumber.equal(new BN(1));
    });
    it("approving the request from investor", async () => {
      await kycInstance.setKycComplete(deployerAccount);
      await kycInstance.setKycComplete(anotherAccount);
      await kycInstance.setKycComplete(recipent);
      await tokenSaleInstance.sendTransaction({
        from: deployerAccount,
        value: web3.utils.toWei("2", "wei"),
      });
      await tokenSaleInstance.sendTransaction({
        from: recipent,
        value: web3.utils.toWei("2", "wei"),
      });
      await tokenSaleInstance.sendTransaction({
        from: anotherAccount,
        value: web3.utils.toWei("2", "wei"),
      });
      await votingInstance.approveRequest(0, { from: recipent });
      await votingInstance.approveRequest(0, { from: anotherAccount });
      expect(
        votingInstance.getRequestApprovalCount(0)
      ).to.eventually.be.a.bignumber.equal(new BN(2));
    });
    it("finalize the request", async () => {});
  });
});
