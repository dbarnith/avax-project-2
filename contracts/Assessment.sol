// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract BarnithWallet {
    
    address payable public walletOwner;
    uint256 public walletBalance;

    event Deposit_Event(uint256 amount);
    event Withdrawal_Event(uint256 amount);
    event NFT_Purchase_Event(uint256 _number);

    error Insufficient_Funds(uint256 balance, uint256 withdrawalAmount);

    constructor(uint initialAmount) payable {
        walletOwner = payable(msg.sender);
        walletBalance = initialAmount;
    }

    function get_Balance() public view returns (uint256) {
        return walletBalance;
    }

    function deposit_Tokens(address _account, uint256 _depositAmount) public payable {
        uint256 previousBalance = walletBalance;
        require(msg.sender == _account, "You do not own the account");

        walletBalance += _depositAmount;
        assert(walletBalance == previousBalance + _depositAmount);

        emit Deposit_Event(_depositAmount);
    }

    function withdraw_Tokens(address _account, uint256 _withdrawalAmount) public {
        require(msg.sender == _account, "You do not own the account");
        uint256 previousBalance = walletBalance;

        if (walletBalance < _withdrawalAmount) {
            revert Insufficient_Funds({
                balance: walletBalance,
                withdrawalAmount: _withdrawalAmount
            });
        }

        walletBalance -= _withdrawalAmount;
        assert(walletBalance == (previousBalance - _withdrawalAmount));

        emit Withdrawal_Event(_withdrawalAmount);
    }

    function get_Address() public view returns (address) {
        return address(this);
    }

    function get_Contract_Balance() public view returns (uint256) {
        return address(this).balance;
    }

    function purchase_NFT(uint256 _number) public {
        withdraw_Tokens(msg.sender, _number);

        emit NFT_Purchase_Event(_number);
    }
}
