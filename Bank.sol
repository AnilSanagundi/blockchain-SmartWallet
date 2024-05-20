pragma solidity 0.4.25;
contract Bank{
    int balance;
    
    constructor() public{
        balance=0 ;
    }
    function getbalance() view public returns(int){
        return balance;
    }
    function withdraw(int amt) public
    {
       balance = balance - amt;
    }
    function deposit(int amount) public{
       balance = balance + amount;
    }
}