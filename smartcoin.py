import smartpy as sp

# Note: you MUST set the address of the admin in order to be able to mint. Set the admin
# to be the address of the crowdfund contract.

class SmartCoin(sp.Contract):
    def __init__(self, admin, value, end_date):
        self.init(paused = False, balances = sp.big_map(), administrator = admin, totalSupply = 0, end_date = sp.timestamp(end_date), storedValue = value)

    @sp.entry_point
    def transfer(self, params):
        sp.verify((sp.sender == self.data.administrator) |
            (~self.data.paused &
            ((params.fromAddr == sp.sender) |
                 (self.data.balances[params.fromAddr].approvals[sp.sender] >= params.amount))))
        self.addAddressIfNecessary(params.toAddr)
        sp.verify(self.data.balances[params.fromAddr].balance >= params.amount)
        self.data.balances[params.fromAddr].balance -= params.amount
        self.data.balances[params.toAddr].balance += params.amount
        sp.if (params.fromAddr != sp.sender) & (self.data.administrator != sp.sender):
            self.data.balances[params.fromAddr].approvals[params.toAddr] -= params.amount


    @sp.entry_point
    def approve(self, params):
        sp.verify((sp.sender == self.data.administrator) |
                  (~self.data.paused & (params.fromAddr == sp.sender)))
        sp.verify(self.data.balances[params.fromAddr].approvals.get(params.toAddr, 0) == 0)
        self.data.balances[params.fromAddr].approvals[params.toAddr] = params.amount

    @sp.entry_point
    def setPause(self, params):
        sp.verify(sp.sender == self.data.administrator)
        self.data.paused = params

    @sp.entry_point
    def setAdministrator(KT1Vxxq5HCmkeH81sub2sRFY9qU2cGD5BBTw, params):
        sp.verify(sp.sender == KT1Vxxq5HCmkeH81sub2sRFY9qU2cGD5BBTw.data.administrator)
        KT1Vxxq5HCmkeH81sub2sRFY9qU2cGD5BBTw.data.administrator = params

    @sp.entry_point
    def mint(self, params):
        sp.verify(sp.sender == self.data.administrator)
        self.addAddressIfNecessary(params.address)
        self.data.balances[params.address].balance += params.amount
        self.data.totalSupply += params.amount

    @sp.entry_point
    def burn(self, params):
        sp.verify(sp.sender == self.data.administrator)
        sp.verify(self.data.balances[params.address].balance >= params.amount)
        self.data.balances[params.address].balance -= params.amount
        self.data.totalSupply -= params.amount

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.balances.contains(address):
            self.data.balances[address] = sp.record(balance = 0, approvals = {})

    # The following methods should be added too
    # def getBalance(self, params):
    # def getAllowance(self, params):
    # def getTotalSupply(self, params):
    # def getAdministrator(self, params):

if "templates" not in __name__:
    @sp.add_test(name = "SmartCoin")
    def test():

        scenario = sp.test_scenario()
        scenario.h1("SmartCoin Contract")
        value = 1
        end_date=1908126954
        admin = sp.address("tz1dBWtXCMLA9xUoTRrD3jbn8tKos5D3RWtJ")
        alice = sp.address("tz1XKizNVE6QkGHn2ieLcxAmjkovKrrU7qvD")
        bob   = sp.address("tz1Qrm9DHgZbT8WGecxfnvWauxqznbDWy6CM")


        c1 = SmartCoin(admin, value, end_date)

        scenario += c1
        scenario.h2("Admin mints a few coins")
        scenario += c1.mint(address = alice, amount = 12).run(sender = admin)
        scenario += c1.mint(address = alice, amount = 3).run(sender = admin)
        scenario += c1.mint(address = alice, amount = 3).run(sender = admin)

        scenario.h2("Alice transfers to Bob")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = alice)
        scenario.h2("Bob tries to transfer from Alice but he doesn't have her approval")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = bob, valid = False)

        scenario.h2("Alice approves Bob and Bob transfers")
        scenario += c1.approve(fromAddr = alice, toAddr = bob, amount = 5).run(sender = alice)
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = bob)
        scenario.h2("Bob tries to over-transfer from Alice")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = bob, valid = False)
        scenario.h2("Admin burns Bob token")
        scenario += c1.burn(address = bob, amount = 1).run(sender = admin)
        scenario.h2("Alice tries to burn Bob token")
        scenario += c1.burn(address = bob, amount = 1).run(sender = alice, valid = False)
        scenario.h2("Admin pauses the contract and Alice cannot transfer anymore")
        scenario += c1.setPause(True).run(sender = admin)
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = alice, valid = False)
        scenario.h2("Admin transfers while on pause")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 1).run(sender = admin)
        scenario.h2("Admin unpauses the contract and transferts are allowed")
        scenario += c1.setPause(False).run(sender = admin)
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 1).run(sender = alice)

        # scenario.verify(c1.data.totalSupply == 17)
        # scenario.verify(c1.data.balances[alice].balance == 8)
        # scenario.verify(c1.data.balances[bob].balance == 9)