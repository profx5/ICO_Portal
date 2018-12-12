pragma solidity ^0.5.1;

import "../openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IMintable {
  function mint(address to, uint256 value) external returns (bool);
}

contract TingesMinter is Ownable {
  using SafeMath for uint256;

  event TokenPurchase(address indexed payer, uint256 USDcAmount, uint256 tokensAmount);

  IMintable Mintable;

  uint256 USDcRate;
  uint256 public USDcRaised;

  constructor(address _TokenAddress, uint256 _USDcRate) public {
    Mintable = IMintable(_TokenAddress);
    USDcRate = _USDcRate;
    USDcRaised = 0;
  }

  function processPayment(address payer, uint256 USDcAmount) public onlyOwner {
    USDcRaised = USDcRaised + USDcAmount;

    uint256 tokensAmount = USDcAmount * USDcRate;

    Mintable.mint(payer, tokensAmount);

    emit TokenPurchase(payer, USDcAmount, tokensAmount);
  }
}
