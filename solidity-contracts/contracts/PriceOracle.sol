pragma solidity ^0.4.0;

import "../openzeppelin-solidity/contracts/ownership/rbac/RBAC.sol";
import "../openzeppelin-solidity/contracts/math/SafeMath.sol";


contract PriceOracle is RBAC {
  using SafeMath for uint256;
  uint256 public ethPriceInCents;
  uint256 public allowedOracleChangePercent;
  string public constant ROLE_ADMIN = "admin";
  string public constant ROLE_ORACLE = "oracle";

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
  modifier onlyOracle()
  {
    checkRole(msg.sender, ROLE_ORACLE);
    _;
  }

  constructor(
    uint256 _initialEthPriceInCents,
    uint256 _allowedOracleChangePercent
  ) public {
    ethPriceInCents = _initialEthPriceInCents;
    allowedOracleChangePercent = _allowedOracleChangePercent;
    addRole(msg.sender, ROLE_ADMIN);
  }

  function getUsdCentsFromWei(uint256 _wei) public view returns (uint256) {
    return _wei.mul(ethPriceInCents).div(1 ether);
  }

  function getWeiFromUsdCents(uint256 _usdCents)
    public view returns (uint256)
  {
    return _usdCents.mul(1 ether).div(ethPriceInCents);
  }

  /**
   * @dev set eth price
   * @param _cents cents
   */
  function setEthPrice(uint256 _cents)
    public
    onlyOracle
  {
    uint256 maxCents = allowedOracleChangePercent.add(100)
    .mul(ethPriceInCents).div(100);
    uint256 minCents = SafeMath.sub(100,allowedOracleChangePercent)
    .mul(ethPriceInCents).div(100);
    require(
      _cents <= maxCents && _cents >= minCents,
      "Price out of allowed range"
    );
    ethPriceInCents = _cents;
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
  function addOracle(address addr)
    public
    onlyAdmin
  {
    addRole(addr, ROLE_ORACLE);
  }

  /**
   * @dev remove a role from an address
   * @param addr address
   */
  function delOracle(address addr)
    public
    onlyAdmin
  {
    removeRole(addr, ROLE_ORACLE);
  }
}
