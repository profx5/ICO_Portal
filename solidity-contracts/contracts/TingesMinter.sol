pragma solidity ^0.5.1;

import "../openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IMintable {
  function mint(address to, uint256 value) external returns (bool);
}

interface ITokensMediator {
  function investor() external view returns (address);
  function transferToken(address tokenAddress, uint256 amount) external;
}

contract TingesMinter is Ownable {
  using SafeMath for uint256;

  event TokenPurchase(address indexed payer, uint256 USDcAmount, uint256 tokensAmount);

  IMintable Mintable;

  uint256 USDcRate;
  uint256 public USDcRaised;

  constructor(uint256 _USDcRate, address mintableAddress) public {
    USDcRate = _USDcRate;
    USDcRaised = 0;

    Mintable = IMintable(mintableAddress);
  }

  function processPayment(
                          address mediatorAddress,
                          address tokenAddress,
                          uint256 tokemsAmount,
                          uint256 USDcAmount
                          ) public onlyOwner {
    USDcRaised = USDcRaised + USDcAmount;

    ITokensMediator mediator = ITokensMediator(mediatorAddress);
    mediator.transferToken(tokenAddress, tokemsAmount);

    Mintable.mint(mediator.investor(), USDcRate * USDcAmount * 100000000000000);
  }
}
