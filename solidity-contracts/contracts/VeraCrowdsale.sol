pragma solidity ^0.4.0;

import "../openzeppelin-solidity/contracts/ownership/rbac/RBAC.sol";
import "../openzeppelin-solidity/contracts/math/Math.sol";
import "../openzeppelin-solidity/contracts/math/SafeMath.sol";


contract PriceOracleIface {
  function getUsdCentsFromWei(uint256 _wei) public view returns (uint256) {
  }
}


contract TransferableTokenIface {
  uint8 public constant decimals = 2;
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
  string public constant ROLE_ADMIN = "admin";
  string public constant ROLE_BACKEND = "backend";
  string public constant ROLE_KYC_VERIFIED_INVESTOR = "kycVerified";


  struct AmountBonus {
    uint256 amountInCents;
    uint256 bonus;
  }

  AmountBonus[] public amountBonuses;

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

  constructor( TransferableTokenIface _token, PriceOracleIface _priceOracle)
  public
  {
    addRole(msg.sender, ROLE_ADMIN);
    token = _token;
    priceOracle = _priceOracle;
    amountBonuses.push(AmountBonus(800000, 20));
    amountBonuses.push(AmountBonus(2000000, 30));
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
    buyTokens(msg.sender, valueInCents);
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

  /**
   * @dev deposit
   */
  function buyTokens(address _investor, uint256 _cents) internal {
    uint256 bonus = computeBonus(_cents);
    //ToDo add bonus logging
    //ToDo add ETH price logging
    uint256 tokens = computeTokens(_cents);
    require(tokens > 0);
    token.transfer(_investor, tokens);
    centsRaised = centsRaised.add(_cents);
    tokensSold = tokensSold.add(tokens);
  }

  function computeBonus(uint256 _cents) public view returns (uint256) {
    uint256 bonus = 0;
    for (uint i = 0; i < amountBonuses.length; i++) {
      if (_cents >= amountBonuses[i].amountInCents) {
        bonus = Math.max256(bonus, amountBonuses[i].bonus);
      }
    }
    return bonus;
  }

  function computeTokens(uint256 _cents) public view returns (uint256) {
    uint256 tokens = _cents.mul(10 ** 18).div(tokenPriceInCents);
    uint256 bonusPercent = computeBonus(_cents);
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
}
