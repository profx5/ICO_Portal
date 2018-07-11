pragma solidity ^0.4.23;


import "../KYCCrowdsale.sol";


// mock class using BasicToken
contract BasicTokenMock is MintableToken {

  constructor(address initialAccount, uint256 initialBalance) public {
    balances[initialAccount] = initialBalance;
    totalSupply_ = initialBalance;
  }

}
