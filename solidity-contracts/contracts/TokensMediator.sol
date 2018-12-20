pragma solidity ^0.5.1;

interface ITransferable {
  function transfer(address to, uint256 value) external returns (bool);
}

contract TokensMediator {
  address public investor;
  address public endPoint;

  constructor(address _investor, address _endPoint) public {
    investor = _investor;
    endPoint = _endPoint;
  }

  function transferToken(address tokenAddress, uint256 amount) public {
    require(msg.sender == endPoint);

    ITransferable(tokenAddress).transfer(endPoint, amount);
  }
}
