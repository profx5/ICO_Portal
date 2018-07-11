const KYCCrowdsale = artifacts.require('KYCCrowdsale');

contract('KYCCrowdsale', function () {

  beforeEach(async function () {
    this.cs = await KYCCrowdsale.new("0xdead", "0xbeef", 100, 100);
  });

  describe('token', function () {
    it('returns token', async function () {
      const token = await this.cs.token();
      assert.equal(token, "0x000000000000000000000000000000000000beef");
    });
  });

  describe('wallet', function () {
    it('returns wallet', async function () {
      const wallet = await this.cs.wallet();
      assert.equal(wallet, "0x000000000000000000000000000000000000dead");
    });
  });

  describe('phaseBonus', function () {
    it('returns phaseBonus', async function () {
      const pb = await this.cs.phaseBonus();
      assert.equal(pb, 100);
    });
  });
});