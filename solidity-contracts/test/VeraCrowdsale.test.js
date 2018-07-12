// import ether from './helpers/ether';
import { advanceBlock } from './helpers/advanceToBlock';
import { increaseTimeTo, duration } from './helpers/increaseTime';
// import latestTime from './helpers/latestTime';
// import EVMRevert from './helpers/EVMRevert';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Crowdsale = artifacts.require('VeraCrowdsale');
const Token = artifacts.require('VeraCoin');

contract('VeraCrowdsale', function ([_, investor, wallet, purchaser]) {
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
    this.crowdsale = await Crowdsale.new(this.token.address);
    await this.token.transfer(this.crowdsale.address, 12343);
  });

  describe('Check public variables', function () {
    it('token address', async function () {
      result = await this.crowdsale.token();
      result.should.be.equal(this.token.address);
    });
    it('tokenPriceInCents', async function () {
      result = await this.crowdsale.tokenPriceInCents();
      result.should.be.bignumber.equal(500);
    });
    it('ethPriceInCents', async function () {
      result = await this.crowdsale.ethPriceInCents();
      result.should.be.bignumber.equal(41620);
    });
    it('phase 0 parameters', async function () {
      result = await this.crowdsale.phases(0);
      result[0].should.be.bignumber.equal(100);
      result[1].should.be.bignumber.equal(200);
      result[2].should.be.bignumber.equal(300);
    });
    it('phase 1 parameters', async function () {
      result = await this.crowdsale.phases(1);
      result[0].should.be.bignumber.equal(100);
      result[1].should.be.bignumber.equal(200);
      result[2].should.be.bignumber.equal(300);
    });
    it('phase 2 parameters', async function () {
      result = await this.crowdsale.phases(2);
      result[0].should.be.bignumber.equal(100);
      result[1].should.be.bignumber.equal(200);
      result[2].should.be.bignumber.equal(300);
    });
    it('amount bonus 0', async function () {
      result = await this.crowdsale.amountBonuses(0);
      result[0].should.be.bignumber.equal(10);
      result[1].should.be.bignumber.equal(20);
    });
    it('amount bonus 1', async function () {
      result = await this.crowdsale.amountBonuses(1);
      result[0].should.be.bignumber.equal(20);
      result[1].should.be.bignumber.equal(30);
    });
  });

  describe('Check constant functions', function () {
    it('computePhaseBonus', async function () {
      result = await this.crowdsale.computePhaseBonus(123);
      result.should.be.bignumber.equal(0);
    });
    it('computeAmountBonus', async function () {
      result = await this.crowdsale.computeAmountBonus(123);
      result.should.be.bignumber.equal(0);
    });
    it('computeBonus', async function () {
      result = await this.crowdsale.computeBonus(1, 2);
      result.should.be.bignumber.equal(0);
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
