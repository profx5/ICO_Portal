pragma solidity ^0.4.0;

import "../openzeppelin-solidity/contracts/ownership/rbac/RBAC.sol";
import "../openzeppelin-solidity/contracts/math/Math.sol";
import "../openzeppelin-solidity/contracts/math/SafeMath.sol";


contract PriceOracleIface {
  uint256 public ethPriceInCents;
  function getUsdCentsFromWei(uint256 _wei) public view returns (uint256) {
  }
}


contract TransferableTokenIface {
  function transfer(address to, uint256 value) public returns (bool) {
  }

  event Transfer(address indexed from, address indexed to, uint256 value);
}


contract VeraCrowdsale is RBAC {
  using SafeMath for uint256;
  uint256 public tokenPriceInCents = 200;
  uint256 public minDepositInCents = 800000;
  uint256 public centsRaised;
  uint256 public tokensSold;
  TransferableTokenIface public token;
  PriceOracleIface public priceOracle;
  address public wallet;
  string public constant ROLE_ADMIN = "admin";
  string public constant ROLE_BACKEND = "backend";
  string public constant ROLE_KYC_VERIFIED_INVESTOR = "kycVerified";

  struct AmountBonus {
    uint256 id;
    uint256 amountFrom;
    uint256 amountTo;
    uint256 bonusPercent;
  }

  AmountBonus[] public amountBonuses;

  /**
   * Event for token purchase logging
   * @param investor who received tokens
   * @param ethPriceInCents ETH price at the moment of purchase
   * @param valueInCents deposit calculated to USD cents
   * @param bonusPercent bonus percent
   */
  event TokenPurchase(
    address indexed investor,
    uint256 ethPriceInCents,
    uint256 valueInCents,
    uint256 bonusPercent,
    uint256 bonusIds
  );

  /**
   * @dev modifier to scope access to admins
   * // reverts
   */
  modifier onlyAdmin()
  {
    checkRole(msg.sender, ROLE_ADMIN);
    _;
  }

  /**
   * @dev modifier to scope access to admins
   * // reverts
   */
  modifier onlyBackend()
  {
    checkRole(msg.sender, ROLE_BACKEND);
    _;
  }

  /**
   * @dev modifier to scope access to admins
   * // reverts
   */
  modifier onlyKYCVerifiedInvestor()
  {
    checkRole(msg.sender, ROLE_KYC_VERIFIED_INVESTOR);
    _;
  }

  constructor(
    TransferableTokenIface _token,
    PriceOracleIface _priceOracle,
    address _wallet
  )
    public
  {
    require(_token != address(0), "Need token contract address");
    require(_priceOracle != address(0), "Need price oracle contract address");
    require(_wallet != address(0), "Need wallet address");
    addRole(msg.sender, ROLE_ADMIN);
    token = _token;
    priceOracle = _priceOracle;
    wallet = _wallet;
    // solium-disable-next-line arg-overflow
    amountBonuses.push(AmountBonus(0x1, 800000, 1999999, 20));
    // solium-disable-next-line arg-overflow
    amountBonuses.push(AmountBonus(0x2, 2000000, 2**256 - 1, 30));
  }

  /**
   * @dev fallback function
   */
  function ()
    external
    payable
    onlyKYCVerifiedInvestor
  {
    uint256 valueInCents = priceOracle.getUsdCentsFromWei(msg.value);
    (uint256 bonusPercent, uint256 bonusIds) = computeBonuses(valueInCents);
    emit TokenPurchase(
      msg.sender,
      priceOracle.ethPriceInCents(),
      valueInCents,
      bonusPercent,
      bonusIds
    );
    buyTokens(msg.sender, valueInCents);
    wallet.transfer(msg.value);
  }

  /**
   * @dev deposit
   */
  function buyTokensViaBackend(address _investor, uint256 _cents)
  public
  onlyBackend
  {
    if (! RBAC.hasRole(_investor, ROLE_KYC_VERIFIED_INVESTOR)) {
      addKycVerifiedInvestor(_investor);
    }
    buyTokens(_investor, _cents);
  }

  function computeBonuses(uint256 _cents)
  public
  view
  returns (uint256, uint256)
  {
    uint256 bonusTotal;
    uint256 bonusIds;
    for (uint i = 0; i < amountBonuses.length; i++) {
      if (_cents >= amountBonuses[i].amountFrom &&
      _cents <= amountBonuses[i].amountTo) {
        bonusTotal += amountBonuses[i].bonusPercent;
        bonusIds += amountBonuses[i].id;
      }
    }
    return (bonusTotal, bonusIds);
  }

  function computeTokens(uint256 _cents) public view returns (uint256) {
    uint256 tokens = _cents.mul(10 ** 18).div(tokenPriceInCents);
    (uint256 bonusPercent, ) = computeBonuses(_cents);
    uint256 bonusTokens = tokens.mul(bonusPercent).div(100);
    if (_cents >= minDepositInCents) {
      return tokens.add(bonusTokens);
    }
  }

  /**
   * @dev add admin role to an address
   * @param addr address
   */
  function addAdmin(address addr)
    public
    onlyAdmin
  {
    addRole(addr, ROLE_ADMIN);
  }

  /**
   * @dev remove a role from an address
   * @param addr address
   */
  function delAdmin(address addr)
    public
    onlyAdmin
  {
    removeRole(addr, ROLE_ADMIN);
  }

    /**
   * @dev add admin role to an address
   * @param addr address
   */
  function addBackend(address addr)
    public
    onlyAdmin
  {
    addRole(addr, ROLE_BACKEND);
  }

  /**
   * @dev remove a role from an address
   * @param addr address
   */
  function delBackend(address addr)
    public
    onlyAdmin
  {
    removeRole(addr, ROLE_BACKEND);
  }

  /**
   * @dev add admin role to an address
   * @param addr address
   */
  function addKycVerifiedInvestor(address addr)
    public
    onlyBackend
  {
    addRole(addr, ROLE_KYC_VERIFIED_INVESTOR);
  }

  /**
   * @dev remove a role from an address
   * @param addr address
   */
  function delKycVerifiedInvestor(address addr)
    public
    onlyBackend
  {
    removeRole(addr, ROLE_KYC_VERIFIED_INVESTOR);
  }

  /**
   * @dev deposit
   */
  function buyTokens(address _investor, uint256 _cents) internal {
    uint256 tokens = computeTokens(_cents);
    require(tokens > 0, "value is not enough");
    token.transfer(_investor, tokens);
    centsRaised = centsRaised.add(_cents);
    tokensSold = tokensSold.add(tokens);
  }
}
