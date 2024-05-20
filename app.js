let contract;
let web3;
let accounts;

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    web3 = new Web3(window.ethereum);
} else {
    console.log('Please install MetaMask!');
}

$(document).ready(function(){
    const address = "0x3252f25fff37ed0edae1d8e2b6fe5addce3e1bcc";
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amt",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    contract = new web3.eth.Contract(abi, address);
    console.log(address);

    // Initialize contract and accounts
    initializeContractAndAccounts();
});

function initializeContractAndAccounts() {
    ethereum.request({ method: 'eth_requestAccounts' })
        .then(accs => {
            accounts = accs;
            document.getElementById('connectButton').innerHTML = 'Connected';
            document.getElementById('accountInfo').innerHTML = 'Account Address: ' + accounts[0];
        })
        .catch(error => {
            console.error('Error connecting to MetaMask:', error);
        });
}

document.getElementById('deposit').addEventListener('click', function(){
    let amt = parseInt($('#amount').val());
    contract.methods.deposit(amt).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log('Transaction Hash:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transaction Receipt:', receipt);
        })
        .on('error', (error) => {
            console.error('Error:', error);
        });
});

document.getElementById('withdraw').addEventListener('click', function(){
    let amt = parseInt($('#amount').val());
    contract.methods.withdraw(amt).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log('Transaction Hash:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transaction Receipt:', receipt);
        })
        .on('error', (error) => {
            console.error('Error:', error);
        });
});

document.getElementById('getBalance').addEventListener('click', function() {
    const gasLimit = 1000000;
    contract.methods.getBalance().call({ gas: gasLimit }).then(function(bal) {
        alert('Balance: ' + bal);
    }).catch(function(error) {
        console.error(error);
    });
});

document.getElementById('connectButton').addEventListener('click', async function() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await initializeContractAndAccounts();
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        document.getElementById('connectButton').innerHTML = 'Please install MetaMask';
    }
});
