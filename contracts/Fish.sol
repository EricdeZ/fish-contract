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
        _mint(msg.sender, 800 * 10 ** decimals());
    }

    mapping(address => uint) public donators;

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

    event Donation(
        address indexed from,
        uint256 amount
    );
    function donate() external payable {
        donators[msg.sender] += msg.value;
        emit Donation(msg.sender, donators[msg.sender]);
    }

    receive() external payable {
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * (10 ** decimals()));
    }

    function payout() public onlyOwner {
        address payable owner = payable(owner());
        owner.transfer(address(this).balance);
    }

}
