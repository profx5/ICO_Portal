pragma solidity ^0.4.0;

import "./VeraCoin.sol";
import "../openzeppelin-solidity/contracts/ownership/rbac/RBAC.sol";
//import "../openzeppelin-solidity/contracts/math/SafeMath.sol";

contract VeraCrowdsale {
    using SafeMath for uint256;
    uint256 public tokenPriceInCents = 500;
    uint256 public ethPriceInCents = 41620;
    VeraCoin public token;

    struct Phase {
        uint256 startDate;
        uint256 endDate;
        uint256 phaseBonus;
    }

    struct AmountBonus {
        uint256 amountInCents;
        uint256 amountBonus;
    }

    Phase[] public phases;
    AmountBonus[] public amountBonuses;

    constructor( VeraCoin _token) public {
        token = _token;
        phases.push(Phase(100, 200, 300));
        phases.push(Phase(100, 200, 300));
        phases.push(Phase(100, 200, 300));
        amountBonuses.push(AmountBonus(10, 20));
        amountBonuses.push(AmountBonus(20, 30));
    }

    function computePhaseBonus(uint256 _time) public constant returns (uint256) {
        return 0;
    }

    function computeAmountBonus(uint256 _amount) public constant returns (uint256) {
        return 0;
    }

    function computeBonus(uint256 _amount, uint256 _time) public constant returns (uint256) {
        return computePhaseBonus(_time).add(computeAmountBonus(_amount));
    }
}
