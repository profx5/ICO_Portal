pragma solidity ^0.4.0;

import "./VeraCoin.sol";
import "../openzeppelin-solidity/contracts/ownership/rbac/RBAC.sol";
import "../openzeppelin-solidity/contracts/math/Math.sol";
//import "../openzeppelin-solidity/contracts/math/SafeMath.sol";

contract VeraCrowdsale {
    using SafeMath for uint256;
    uint256 public tokenPriceInCents = 500;
    uint256 public ethPriceInCents = 41620;
    VeraCoin public token;

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

    constructor( VeraCoin _token) public {
        token = _token;
        phases.push(Phase(1531490000, 1531499999, 10));
        phases.push(Phase(1531500000, 1531599999, 20));
        phases.push(Phase(1531600000, 1531600000, 30));
        amountBonuses.push(AmountBonus(100000, 20));
        amountBonuses.push(AmountBonus(500000, 30));
    }


    function computePhaseBonus(uint256 _time) public constant returns (uint256) {
        for (uint i=0; i<phases.length; i++) {
          if (_time >= phases[i].start && _time <= phases[i].end) {
            return phases[i].bonus;
          }
        }
        revert('out of phase');
    }

    function computeAmountBonus(uint256 _amount) public constant returns (uint256) {
        uint256 bonus = 0;
        for (uint i=0; i<amountBonuses.length; i++) {
          if (_amount >= amountBonuses[i].amountInCents) {
            bonus = Math.max256(bonus, amountBonuses[i].bonus);
          }
        }
        return bonus;
    }

    function computeBonus(uint256 _time, uint256 _amount) public constant returns (uint256) {
        return computePhaseBonus(_time).add(computeAmountBonus(_amount));
    }
}
