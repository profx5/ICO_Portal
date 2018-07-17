pragma solidity ^0.4.0;

import "./VeraCoin.sol";
import "./PriceOracle.sol";
import "../openzeppelin-solidity/contracts/ownership/rbac/RBAC.sol";
import "../openzeppelin-solidity/contracts/math/Math.sol";
//import "../openzeppelin-solidity/contracts/math/SafeMath.sol";


contract VeraCrowdsale is RBAC {
  using SafeMath for uint256;
  uint256 public tokenPriceInCents = 500;
  VeraCoin public token;
  string public constant ROLE_ADMIN = "admin";
  string public constant ROLE_KYC_MANAGER = "kycManager";
  string public constant ROLE_KYC_VERIFIED_INVESTOR = "kycVerified";

  struct Phase {
    uint256 start;
    uint256 end;
    uint256 bonus;
  }

  struct AmountBonus {
    uint256 amountInCents;
    uint256 bonus;
  }

  Phase[] public phases;
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
  modifier onlyKycManager()
  {
    checkRole(msg.sender, ROLE_KYC_MANAGER);
    _;
  }

  constructor( VeraCoin _token, ) public {
    addRole(msg.sender, ROLE_ADMIN);
    token = _token;
    phases.push(Phase(1531490000, 1531499999, 10));
    phases.push(Phase(1531500000, 1531599999, 20));
    phases.push(Phase(1531600000, 1531600000, 30));
    amountBonuses.push(AmountBonus(100000, 20));
    amountBonuses.push(AmountBonus(500000, 30));
  }

  function computePhaseBonus(uint256 _time) public view returns (uint256) {
    for (uint i = 0; i < phases.length; i++) {
      if (_time >= phases[i].start && _time <= phases[i].end) {
        return phases[i].bonus;
      }
    }
    revert("out of phase");
  }

  function computeAmountBonus(uint256 _amount) public view returns (uint256) {
    uint256 bonus = 0;
    for (uint i = 0; i < amountBonuses.length; i++) {
      if (_amount >= amountBonuses[i].amountInCents) {
        bonus = Math.max256(bonus, amountBonuses[i].bonus);
      }
    }
    return bonus;
  }

  function computeBonus(
    uint256 _time,
    uint256 _amount
  )
  public view returns (uint256)
  {
    return computePhaseBonus(_time).add(computeAmountBonus(_amount));
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
  function addKycManager(address addr)
    public
    onlyAdmin
  {
    addRole(addr, ROLE_KYC_MANAGER);
  }

  /**
   * @dev remove a role from an address
   * @param addr address
   */
  function delKycManager(address addr)
    public
    onlyAdmin
  {
    removeRole(addr, ROLE_KYC_MANAGER);
  }

  /**
   * @dev add admin role to an address
   * @param addr address
   */
  function addKycVerifiedInvestor(address addr)
    public
    onlyKycManager
  {
    addRole(addr, ROLE_KYC_VERIFIED_INVESTOR);
  }

  /**
   * @dev remove a role from an address
   * @param addr address
   */
  function delKycVerifiedInvestor(address addr)
    public
    onlyKycManager
  {
    removeRole(addr, ROLE_KYC_VERIFIED_INVESTOR);
  }
}
