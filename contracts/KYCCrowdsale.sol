pragma solidity ^0.4.23;


/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    /**
    * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}


contract MintableToken {
    using SafeMath for uint256;

    string public name = "Mintable Token";

    string public symbol = "MNT";

    uint8 public decimals = 2;

    mapping (address => uint256) balances;

    uint256 totalSupply_;

    event Mint(address indexed to, uint256 amount);

    event Transfer(address indexed from, address indexed to, uint256 value);

    function mint(address _to, uint256 _amount) public returns (bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[msg.sender]);
        // SafeMath.sub will throw if there is not enough balance.
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}


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

    MintableToken public token;

    event FundsHold(address indexed investor, uint256 weiAmount, uint256 tokens);

    event FundsReleased(address indexed investor, uint256 weiAmount, uint256 tokens);

    event KYCPassed(address indexed investor);

    event TokensPurchased(address indexed investor, uint256 weiAmount, uint256 tokens);

    function KYCCrowdsale(address _wallet, MintableToken _token, uint256 _phaseBonus, uint256 _USDcPerETH) public {
        require(_wallet != address(0));
        require(_token != MintableToken(0));
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
        token.mint(_investor, _tokens);
        emit TokensPurchased(_investor, _weiAmount, _tokens);
    }
}
