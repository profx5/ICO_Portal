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

const Oracle = artifacts.require('PriceOracle');

contract('PriceOracle', function (accounts) {
  const priceInCents = new BigNumber(1234556);
  const allowedOracleChangePercent = new BigNumber(10);
  let result;

  beforeEach(async function () {
    this.oracle = await Oracle.new(priceInCents, allowedOracleChangePercent);
  });

  describe('Check public variables', async function () {
    it('ethPriceInCents', async function () {
      result = await this.oracle.ethPriceInCents();
      result.should.be.bignumber.equal(priceInCents);
    });
    it('allowedOracleChangePercent', async function () {
      result = await this.oracle.allowedOracleChangePercent();
      result.should.be.bignumber.equal(allowedOracleChangePercent);
    });
  });

  describe('RBAC', async function () {
    beforeEach(async function () {
      this.roleAdmin = await this.oracle.ROLE_ADMIN();
      this.roleOracle = await this.oracle.ROLE_ORACLE();
    });
    it('initial roles', async function () {
      result = await this.oracle.hasRole(accounts[0], this.roleAdmin);
      result.should.be.equal(true);
      result = await this.oracle.hasRole(accounts[1], this.roleAdmin);
      result.should.be.equal(false);
      result = await this.oracle.hasRole(accounts[0], this.roleOracle);
      result.should.be.equal(false);
      result = await this.oracle.hasRole(accounts[1], this.roleOracle);
      result.should.be.equal(false);
    });
    it('Non-admin unable to add admin', async function () {
      await this.oracle.addAdmin(accounts[1], { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
    });
    it('Non-admin unable to add Oracle', async function () {
      await this.oracle.addOracle(accounts[1], { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
    });
    it('Non-admin unable to del admin', async function () {
      await this.oracle.delAdmin(accounts[0], { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
    });
    it('Admin is able to add admins', async function () {
      const { logs } = await this.oracle.addAdmin(accounts[2], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleAdded');
      event.args.addr.should.equal(accounts[2]);
      event.args.roleName.should.equal(this.roleAdmin);
    });
    it('Admin is able to add Oracles', async function () {
      const { logs } = await this.oracle.addOracle(accounts[2], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleAdded');
      event.args.addr.should.equal(accounts[2]);
      event.args.roleName.should.equal(this.roleOracle);
    });
    it('Admin is able to del admins (himself)', async function () {
      const { logs } = await this.oracle.delAdmin(accounts[0], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleRemoved');
      event.args.addr.should.equal(accounts[0]);
      event.args.roleName.should.equal(this.roleAdmin);
    });
    it('Non-oracle unable to update rate (admin privs don\'t make sense)', async function () {
      await this.oracle.setEthPrice(1234555, { from: accounts[1] }).should.be.rejectedWith(EVMRevert);
      await this.oracle.setEthPrice(1234555, { from: accounts[0] }).should.be.rejectedWith(EVMRevert);
    });

    describe('after Acc1 added to admins', async function () {

      beforeEach(async function () {
        await this.oracle.addAdmin(accounts[1]).should.be.fulfilled;
      });

      it('Role checks - both are admins', async function () {
        result = await this.oracle.hasRole(accounts[0], this.roleAdmin);
        result.should.be.equal(true);
        result = await this.oracle.hasRole(accounts[1], this.roleAdmin);
        result.should.be.equal(true);
      });

      it('Both admins able to add admins', async function () {
        var tx = await this.oracle.addAdmin(accounts[2], { from: accounts[0] }).should.be.fulfilled;
        const logs1 = tx.logs;
        const event1 = logs1.find(e => e.event === 'RoleAdded');
        event1.args.addr.should.equal(accounts[2]);
        event1.args.roleName.should.equal(this.roleAdmin);
        tx = await this.oracle.addAdmin(accounts[3], { from: accounts[1] }).should.be.fulfilled;
        const logs2 = tx.logs;
        const event2 = logs2.find(e => e.event === 'RoleAdded');
        event2.args.addr.should.equal(accounts[3]);
        event2.args.roleName.should.equal(this.roleAdmin);
      });

      it('Non-admin unable to add admin', async function () {
        await this.oracle.addAdmin(accounts[2], { from: accounts[2] }).should.be.rejectedWith(EVMRevert);
      });

      it('Non-admin unable to del admin', async function () {
        await this.oracle.delAdmin(accounts[0], { from: accounts[2] }).should.be.rejectedWith(EVMRevert);
      });

      it('Admin is able to del admins', async function () {
        const { logs } = await this.oracle.delAdmin(accounts[0], { from: accounts[1] }).should.be.fulfilled;
        const event = logs.find(e => e.event === 'RoleRemoved');
        event.args.addr.should.equal(accounts[0]);
        event.args.roleName.should.equal(this.roleAdmin);
      });

      describe('Acc3 added to oracles', async function () {
        beforeEach(async function () {
          await this.oracle.addOracle(accounts[3]).should.be.fulfilled;
        });

        it('Oracle is able to set ETH price', async function () {
          await this.oracle.setEthPrice(new BigNumber(1234666), { from: accounts[3] }).should.be.fulfilled;
          result = await this.oracle.ethPriceInCents();
          result.should.be.bignumber.equal(1234666);
        });

        it('admin is able to del oracles', async function () {
          const { logs } = await this.oracle.delOracle(accounts[3], { from: accounts[1] }).should.be.fulfilled;
          const event = logs.find(e => e.event === 'RoleRemoved');
          event.args.addr.should.equal(accounts[3]);
          event.args.roleName.should.equal(this.roleOracle);
        });

        it('another admin is able to del oracles', async function () {
          const { logs } = await this.oracle.delOracle(accounts[3], { from: accounts[0] }).should.be.fulfilled;
          const event = logs.find(e => e.event === 'RoleRemoved');
          event.args.addr.should.equal(accounts[3]);
          event.args.roleName.should.equal(this.roleOracle);
        });

        it('Non-admin unable to del oracle', async function () {
          await this.oracle.delOracle(accounts[3], { from: accounts[2] }).should.be.rejectedWith(EVMRevert);
        });

        it('oracle unable to del oracle (if not admin)', async function () {
          await this.oracle.delOracle(accounts[3], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        it('oracle unable to add admins', async function () {
          await this.oracle.addAdmin(accounts[4], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        it('oracle unable to del admins', async function () {
          await this.oracle.delAdmin(accounts[1], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        describe('Acc3 removed from Oracles', async function () {
          beforeEach(async function () {
            await this.oracle.delOracle(accounts[3]).should.be.fulfilled;
          });
          it('* ToDo check KYC privileges revoked', async function () {
            assert(true);
          });
        });
      });
    });
  });
  /*
  describe('RBAC', async function () {
    beforeEach(async function () {
      this.adminRoleName = await this.crowdsale.ROLE_ADMIN();
      this.kycManager = await this.crowdsale.ROLE_KYC_MANAGER();
      this.kycInvestor = await this.crowdsale.ROLE_KYC_VERIFIED_INVESTOR();
    });
    it('Initial role checks', async function () {
      result = await this.crowdsale.hasRole(accounts[0], this.adminRoleName);
      result.should.be.equal(true);
      result = await this.crowdsale.hasRole(accounts[1], this.adminRoleName);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[0], this.kycManager);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[1], this.kycManager);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[0], this.kycInvestor);
      result.should.be.equal(false);
      result = await this.crowdsale.hasRole(accounts[1], this.kycInvestor);
      result.should.be.equal(false);
    });
    it('Admin is able to add admins', async function () {
      const { logs } = await this.crowdsale.addAdmin(accounts[2], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleAdded');
      event.args.addr.should.equal(accounts[2]);
      event.args.roleName.should.equal(this.adminRoleName);
    });
    it('Admin is able to add kycManagers', async function () {
      const { logs } = await this.crowdsale.addKycManager(accounts[2], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleAdded');
      event.args.addr.should.equal(accounts[2]);
      event.args.roleName.should.equal(this.kycManager);
    });
    it('Admin is able to del admins (himself)', async function () {
      const { logs } = await this.crowdsale.delAdmin(accounts[0], { from: accounts[0] }).should.be.fulfilled;
      const event = logs.find(e => e.event === 'RoleRemoved');
      event.args.addr.should.equal(accounts[0]);
      event.args.roleName.should.equal(this.adminRoleName);
    });
    it('Non-kycManager unable to verify investors (admin privs don\'t make sense)', async function () {
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

      describe('Acc3 added to KYC managers', async function () {
        beforeEach(async function () {
          await this.crowdsale.addKycManager(accounts[3]).should.be.fulfilled;
        });

        it('KYC manager is able to verify and un-verify investors', async function () {
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

        it('admin is able to del kycManagers', async function () {
          const { logs } = await this.crowdsale.delKycManager(accounts[3], { from: accounts[1] }).should.be.fulfilled;
          const event = logs.find(e => e.event === 'RoleRemoved');
          event.args.addr.should.equal(accounts[3]);
          event.args.roleName.should.equal(this.kycManager);
        });

        it('another admin is able to del kycManagers', async function () {
          const { logs } = await this.crowdsale.delKycManager(accounts[3], { from: accounts[0] }).should.be.fulfilled;
          const event = logs.find(e => e.event === 'RoleRemoved');
          event.args.addr.should.equal(accounts[3]);
          event.args.roleName.should.equal(this.kycManager);
        });

        it('Non-admin unable to del kycManager', async function () {
          await this.crowdsale.delKycManager(accounts[3], { from: accounts[2] }).should.be.rejectedWith(EVMRevert);
        });

        it('kycManager unable to del kycManager (if not admin)', async function () {
          await this.crowdsale.delKycManager(accounts[3], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        it('kycManager unable to add admins', async function () {
          await this.crowdsale.addAdmin(accounts[4], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        it('kycManager unable to del admins', async function () {
          await this.crowdsale.delAdmin(accounts[1], { from: accounts[3] }).should.be.rejectedWith(EVMRevert);
        });

        describe('Acc3 removed from KYC managers', async function () {
          beforeEach(async function () {
            await this.crowdsale.delKycManager(accounts[3]).should.be.fulfilled;
          });
          it('* ToDo check KYC privileges revoked', async function () {
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
*/
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
