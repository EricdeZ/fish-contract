// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Fish is ERC20, ERC20Burnable, Ownable {

    constructor()
    ERC20(unicode"🐟", unicode"🐟")
    Ownable()
    {
        _mint(msg.sender, 800);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }


    function transfer(address to, uint256 value) public override returns (bool) {
        require(tx.origin == owner(), unicode"You cannot transfer 🐟");
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        require(tx.origin == owner(), unicode"You cannot transfer 🐟");
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }


    event Bought(
        address indexed from
    );
    function buy() external payable {
        require(msg.value == 1 ether, unicode"1 🐟 = 1 ZENIQ");
        _mint(msg.sender, 1);
        emit Bought(msg.sender);
    }



    struct Donation {
        address walletAddress;
        string name;
        uint256 amount;
    }
    Donation[10] public donations;
    mapping(address => Donation) public donators;
    event Donate(
        address indexed from,
        string name,
        uint256 amount
    );
    function donate(string memory name) external payable {
        Donation memory donation = Donation(msg.sender, name, donators[msg.sender].amount + msg.value);
        donators[msg.sender] = donation;

        uint256 lowestValue = donations[0].amount;
        uint256 lowestIndex = 0;
        bool found = false;
        for (uint256 i = 0; i < donations.length; i++) {
            if (donations[i].walletAddress == msg.sender) {
                donations[i] = donation;
                found = true;
                break;
            }
            if (donations[i].amount < lowestValue) {
                lowestValue = donations[i].amount;
                lowestIndex = i;
            }
        }
        if (donation.amount > lowestValue && !found) {
            donations[lowestIndex] = donation;
        }
        emit Donate(msg.sender, donation.name, donation.amount);
    }

    receive() external payable {
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function payout() public onlyOwner {
        address payable owner = payable(owner());
        owner.transfer(address(this).balance);
    }

}
