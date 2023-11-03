// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Fish is ERC20, ERC20Burnable, Ownable, ERC20Permit {


    constructor()
    ERC20(unicode"🐟", unicode"🐟")
    Ownable(tx.origin)
    ERC20Permit(unicode"🐟")
    {
        _mint(msg.sender, 2000 * 10 ** decimals());
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
        _mint(msg.sender, 1 * (10 ** decimals()));
        emit Bought(msg.sender);
    }

    function donate() external payable {
//        emit Donated(msg.sender, msg.value);
    }

    receive() external payable {
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * (10 ** decimals()));
    }
}
