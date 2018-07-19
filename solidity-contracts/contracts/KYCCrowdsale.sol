pragma solidity ^0.4.23;

// commented to avoid compilation errors because safeMath is already imported in VeraCoin
// import "../openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./VeraCoin.sol";

contract KYCCrowdsale {
    using SafeMath for uint256;

    // This is a type for a single proposal.
    struct Investor {
        uint256 weiDeposited;
        uint256 tokensToMint;
        bool passedKYC;
    }

    uint256 public phaseBonus;

    uint256 public USDcPerETH;

    // deposits kept for minting after KYC
    // equal to amount of tokens to mint after KYC
    mapping (address => Investor) public investors;

    address public wallet;

    VeraCoin public token;

    event FundsHold(address indexed investor, uint256 weiAmount, uint256 tokens);

    event FundsReleased(address indexed investor, uint256 weiAmount, uint256 tokens);

    event KYCPassed(address indexed investor);

    event TokensPurchased(address indexed investor, uint256 weiAmount, uint256 tokens);

    constructor(address _wallet, VeraCoin _token, uint256 _phaseBonus, uint256 _USDcPerETH) public {
        require(_wallet != address(0));
        require(_token != VeraCoin(0));
        token = _token;
        wallet = _wallet;

        phaseBonus = _phaseBonus;
        USDcPerETH = _USDcPerETH;
    }

    function() external payable {
        require(msg.value > 0);
        uint256 tokens = calculateTokens(msg.value);
        if (investors[msg.sender].passedKYC) {
            makePurchase(msg.sender, msg.value, tokens);
        } else {
            holdFunds(tokens);
        }
    }

    function calculateTokens(uint256 _weiAmount) view public returns (uint256) {
        return (_weiAmount * USDcPerETH * (100 + phaseBonus)).div(10 ** 20);
    }

    // called by LK
    function passKYC(address _investor) public {
        require(_investor != address(0));
        investors[_investor].passedKYC = true;
        emit KYCPassed(_investor);
        if (investors[_investor].tokensToMint > 0) {
            releaseFundsAndPurchase(_investor);
        }
    }

    // keep deposit records in local balances without actial minting
    // until KYC passed
    function holdFunds(uint256 _tokens) internal returns (bool) {
        require(_tokens > 0);
        investors[msg.sender].weiDeposited = investors[msg.sender].weiDeposited.add(msg.value);
        investors[msg.sender].tokensToMint = investors[msg.sender].tokensToMint.add(_tokens);
        emit FundsHold(msg.sender, msg.value, _tokens);
    }

    function releaseFundsAndPurchase(address _investor) internal returns (bool) {
        emit FundsReleased(_investor, investors[_investor].weiDeposited, investors[_investor].tokensToMint);
        makePurchase(_investor, investors[_investor].weiDeposited, investors[_investor].tokensToMint);
        investors[_investor].weiDeposited = 0;
        investors[_investor].tokensToMint = 0;
    }

    function makePurchase(address _investor, uint256 _weiAmount, uint256 _tokens) internal {
        require(_investor != address(0));
        require(_tokens > 0);
        wallet.transfer(_weiAmount);
        token.transfer(_investor, _tokens);
        emit TokensPurchased(_investor, _weiAmount, _tokens);
    }
}
