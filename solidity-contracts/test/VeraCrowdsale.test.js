// import ether from './helpers/ether';
import { advanceBlock } from './helpers/advanceToBlock';
import { increaseTimeTo, duration } from './helpers/increaseTime';
import assertRevert from '../openzeppelin-solidity/test/helpers/assertRevert';
// import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Crowdsale = artifacts.require('VeraCrowdsale');
const Token = artifacts.require('VeraCoin');
const Oracle = artifacts.require('PriceOracle');

contract('PriceOracleIface', function () {
  const priceOracleIface = artifacts.require('PriceOracleIface');
  let result;
  beforeEach(async function () {
    this.priceOracleIface = await priceOracleIface.new();
  });
  describe('Check getUsdCentsFromWei method', async function () {
    it('getUsdCentsFromWei', async function () {
      result = await this.priceOracleIface.getUsdCentsFromWei(100).should.be.fulfilled;
      result.should.be.bignumber.equal(0);
    });
  });
});

contract('TransferableTokenIface', function (accounts) {
  const transferableTokenIface = artifacts.require('TransferableTokenIface');
  beforeEach(async function () {
    this.tkn = await transferableTokenIface.new().should.be.fulfilled;
  });
  describe('Check transfer method', async function () {
    it('transfer', async function () {
      await this.tkn.transfer(accounts[0], new BigNumber(100)).should.be.fulfilled;
    });
  });
})

contract('VeraCrowdsale', function (accounts) {
  // const rate = new BigNumber(1);
  // const value = ether(42);
  let result;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
    await advanceBlock();
  });

  beforeEach(async function () {
    // this.openingTime = latestTime() + duration.weeks(1);
    this.token = await Token.new();
    this.oracle = await Oracle.new(43212, 10);
    this.crowdsale = await Crowdsale.new(this.token.address, this.oracle.address);
    await this.token.transfer(this.crowdsale.address, 12343);
  });

  describe('Check public variables', async function () {
    it('token address', async function () {
      result = await this.crowdsale.token();
      result.should.be.equal(this.token.address);
    });
    it('tokenPriceInCents', async function () {
      result = await this.crowdsale.tokenPriceInCents();
      result.should.be.bignumber.equal(500);
    });
    it('phase 0 parameters', async function () {
      result = await this.crowdsale.phases(0);
      result[0].should.be.bignumber.equal(1531490000);
      result[1].should.be.bignumber.equal(1531499999);
      result[2].should.be.bignumber.equal(10);
    });
    it('phase 1 parameters', async function () {
      result = await this.crowdsale.phases(1);
      result[0].should.be.bignumber.equal(1531500000);
      result[1].should.be.bignumber.equal(1531599999);
      result[2].should.be.bignumber.equal(20);
    });
    it('phase 2 parameters', async function () {
      result = await this.crowdsale.phases(2);
      result[0].should.be.bignumber.equal(1531600000);
      result[1].should.be.bignumber.equal(1531600000);
      result[2].should.be.bignumber.equal(30);
    });
    it('amount bonus 0', async function () {
      result = await this.crowdsale.amountBonuses(0);
      result[0].should.be.bignumber.equal(100000);
      result[1].should.be.bignumber.equal(20);
    });
    it('amount bonus 1', async function () {
      result = await this.crowdsale.amountBonuses(1);
      result[0].should.be.bignumber.equal(500000);
      result[1].should.be.bignumber.equal(30);
    });
  });

  describe('Check constant functions', async function () {
    it('computePhaseBonus', async function () {
      result = await this.crowdsale.computePhaseBonus(1531490001);
      result.should.be.bignumber.equal(10);
    });
    it('computeAmountBonus', async function () {
      result = await this.crowdsale.computeAmountBonus(500001);
      result.should.be.bignumber.equal(30);
    });
    it('computeBonus', async function () {
      result = await this.crowdsale.computeBonus(1531490001, 500001);
      result.should.be.bignumber.equal(40);
    });
  });

  describe('RBAC', async function () {
    beforeEach(async function () {
      this.adminRoleName = await this.crowdsale.ROLE_ADMIN();
      this.backendRoleName = await this.crowdsale.ROLE_BACKEND();
      this.kycInvestor = await this.crowdsale.ROLE_KYC_VERIFIED_INVESTOR();
    });
    it('Initial role checks', async function () {
      result = await this.crowdsale.hasRole(accounts[0], this.adminRoleName);
      result.should.be.equal(true);
      result = await this.crowdsale.hasRole(accounts[1], this.adminRoleName);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[0], this.backendRoleName);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[1], this.backendRoleName);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[0], this.kycInvestor);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[1], this.kycInvestor);
      result.should.be.equal(false);
    });
    it('Non-admin unable to add admin', async function () {
      await this.crowdsale.addAdmin(accounts[1], { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
    });
    it('Non-admin unable to add backendRoleName', async function () {
      await this.crowdsale.addBackend(accounts[1], { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
    });
    it('Non-admin unable to del admin', async function () {
      await this.crowdsale.delAdmin(accounts[0], { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
    });
    it('Admin is able to add admins', async function () {
      const { logs } = await this.crowdsale.addAdmin(accounts[2], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleAdded');
      event.args.addr.should.equal(accounts[2]);
      event.args.roleName.should.equal(this.adminRoleName);
    });
    it('Admin is able to add Backends', async function () {
      const { logs } = await this.crowdsale.addBackend(accounts[2], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleAdded');
      event.args.addr.should.equal(accounts[2]);
      event.args.roleName.should.equal(this.backendRoleName);
    });
    it('Admin is able to del admins (himself)', async function () {
      const { logs } = await this.crowdsale.delAdmin(accounts[0], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleRemoved');
      event.args.addr.should.equal(accounts[0]);
      event.args.roleName.should.equal(this.adminRoleName);
    });
    it('Non-backend unable to verify investors (admin privs don\'t make sense)', async function () {
      await this.crowdsale.addKycVerifiedInvestor(accounts[0], { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
      await this.crowdsale.addKycVerifiedInvestor(accounts[0], { from: accounts[0] }).should.be.rejectedWith(EVMRevert);
    });

    describe('after Acc1 added to admins', async function () {

      beforeEach(async function () {
        await this.crowdsale.addAdmin(accounts[1]).should.be.fulfilled;
      });

      it('Role checks - both are admins', async function () {
        result = await this.crowdsale.hasRole(accounts[0], this.adminRoleName);
        result.should.be.equal(true);
        result = await this.crowdsale.hasRole(accounts[1], this.adminRoleName);
        result.should.be.equal(true);
      });

      it('Both admins able to add admins', async function () {
        var tx = await this.crowdsale.addAdmin(accounts[2], { from: accounts[0] }).should.be.fulfilled;
        const logs1 = tx.logs;
        const event1 = logs1.find(e => e.event === 'RoleAdded');
        event1.args.addr.should.equal(accounts[2]);
        event1.args.roleName.should.equal(this.adminRoleName);
        tx = await this.crowdsale.addAdmin(accounts[3], { from: accounts[1] }).should.be.fulfilled;
        const logs2 = tx.logs;
        const event2 = logs2.find(e => e.event === 'RoleAdded');
        event2.args.addr.should.equal(accounts[3]);
        event2.args.roleName.should.equal(this.adminRoleName);
      });

      it('Non-admin unable to add admin', async function () {
        await this.crowdsale.addAdmin(accounts[2], { from: accounts[2] }).should.be.rejectedWith(EVMRevert);
      });

      it('Non-admin unable to del admin', async function () {
        await this.crowdsale.delAdmin(accounts[0], { from: accounts[2] }).should.be.rejectedWith(EVMRevert);
      });

      it('Admin is able to del admins', async function () {
        const { logs } = await this.crowdsale.delAdmin(accounts[0], { from: accounts[1] }).should.be.fulfilled;
        const event = logs.find(e => e.event === 'RoleRemoved');
        event.args.addr.should.equal(accounts[0]);
        event.args.roleName.should.equal(this.adminRoleName);
      });

      describe('Acc3 added to backends', async function () {
        beforeEach(async function () {
          await this.crowdsale.addBackend(accounts[3]).should.be.fulfilled;
        });

        it('Backend manager is able to verify and un-verify investors', async function () {
          result = await this.crowdsale.hasRole(accounts[2], this.kycInvestor);
          result.should.be.equal(false);
          var tx = await this.crowdsale.addKycVerifiedInvestor(accounts[2], { from: accounts[3] }).should.be.fulfilled;
          const logs1 = tx.logs;
          const event1 = logs1.find(e => e.event === 'RoleAdded');
          event1.args.addr.should.equal(accounts[2]);
          event1.args.roleName.should.equal(this.kycInvestor);
          result = await this.crowdsale.hasRole(accounts[2], this.kycInvestor);
          result.should.be.equal(true);
          tx = await this.crowdsale.delKycVerifiedInvestor(accounts[2], { from: accounts[3] }).should.be.fulfilled;
          const logs2 = tx.logs;
          const event2 = logs2.find(e => e.event === 'RoleRemoved');
          event2.args.addr.should.equal(accounts[2]);
          event2.args.roleName.should.equal(this.kycInvestor);
          result = await this.crowdsale.hasRole(accounts[2], this.kycInvestor);
          result.should.be.equal(false);
        });

        it('admin is able to del Backends', async function () {
          const { logs } = await this.crowdsale.delBackend(accounts[3], { from: accounts[1] }).should.be.fulfilled;
          const event = logs.find(e => e.event === 'RoleRemoved');
          event.args.addr.should.equal(accounts[3]);
          event.args.roleName.should.equal(this.backendRoleName);
        });

        it('another admin is able to del Backends', async function () {
          const { logs } = await this.crowdsale.delBackend(accounts[3], { from: accounts[0] }).should.be.fulfilled;
          const event = logs.find(e => e.event === 'RoleRemoved');
          event.args.addr.should.equal(accounts[3]);
          event.args.roleName.should.equal(this.backendRoleName);
        });

        it('Non-admin unable to del Backends', async function () {
          await this.crowdsale.delBackend(accounts[3], { from: accounts[2] }).should.be.rejectedWith(EVMRevert);
        });

        it('kycManager unable to del Backend (if not admin)', async function () {
          await this.crowdsale.delBackend(accounts[3], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        it('Backend unable to add admins', async function () {
          await this.crowdsale.addAdmin(accounts[4], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        it('Backend unable to del admins', async function () {
          await this.crowdsale.delAdmin(accounts[1], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        describe('Acc3 removed from Backend', async function () {
          beforeEach(async function () {
            await this.crowdsale.delBackend(accounts[3]).should.be.fulfilled;
          });
          it('* ToDo check Backend privileges revoked', async function () {
            assert(true);
          });
        });
      });

      describe('then Acc0 removed from admins', async function () {
        beforeEach(async function () {
          await this.crowdsale.delAdmin(accounts[0], { from: accounts[1] }).should.be.fulfilled;
        });

        it('Role checks - admin is Acc1 only', async function () {
          result = await this.crowdsale.hasRole(accounts[0], this.adminRoleName);
          result.should.be.equal(false);
          result = await this.crowdsale.hasRole(accounts[1], this.adminRoleName);
          result.should.be.equal(true);
        });

        it('Non-admin unable to add admin', async function () {
          await this.crowdsale.addAdmin(accounts[2], { from: accounts[0] }).should.be.rejectedWith(EVMRevert);
        });

        it('Admin is able to add admins', async function () {
          await this.crowdsale.addAdmin(accounts[3], { from: accounts[1] }).should.be.fulfilled;
        });
      });
    });
  });

  it('should be ended only after end', async function () {
    // let ended = await this.crowdsale.hasClosed();
    // ended.should.equal(false);
    await increaseTimeTo(this.afterClosingTime);
    // ended = await this.crowdsale.hasClosed();
    // ended.should.equal(true);
  });

/*  describe('accepting payments', function () {
    it('should reject payments before start', async function () {
      await this.crowdsale.send(value).should.be.rejectedWith(EVMRevert);
      await this.crowdsale.buyTokens(investor, { from: purchaser, value: value }).should.be.rejectedWith(EVMRevert);
    });

    it('should accept payments after start', async function () {
      await increaseTimeTo(this.openingTime);
      await this.crowdsale.send(value).should.be.fulfilled;
      await this.crowdsale.buyTokens(investor, { value: value, from: purchaser }).should.be.fulfilled;
    });

    it('should reject payments after end', async function () {
      await increaseTimeTo(this.afterClosingTime);
      await this.crowdsale.send(value).should.be.rejectedWith(EVMRevert);
      await this.crowdsale.buyTokens(investor, { value: value, from: purchaser }).should.be.rejectedWith(EVMRevert);
    });
  }); */
});
