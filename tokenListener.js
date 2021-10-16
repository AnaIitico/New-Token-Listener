
const {ethers} = require('ethers');
const dotenv = require('dotenv').config();

var addresses = {
    WBNB: '',
    factory: '',
    router: '',
    recipient: ''
};
  
const network = 'MAINNET';//KOVAN//TESTNET
var provider = '';
  
function getNetwork(network) {
if(network === 'TESTNET') {
    provider = new ethers.providers.WebSocketProvider(process.env.TESTNET_PROVIDER);
    addresses = {
        WBNB: process.env.TESTNET_WBNB,
        factory: process.env.TESTNET_FACTORY,
        router: process.env.TESTNET_ROUTER,
        recipient: process.env.TESTNET_RECIPIENT
    };
}
else if(network === 'MAINNET') {
    provider = new ethers.providers.WebSocketProvider(process.env.MAINNET_PROVIDER);
    addresses = {
        WBNB: process.env.MAINNET_WBNB,
        factory: process.env.MAINNET_FACTORY,
        router: process.env.MAINNET_ROUTER,
        recipient: process.env.MAINNET_RECIPIENT
    };
} 
else {
    console.log('No valid network selected');
    };
};
  
getNetwork(network);
  
// console.log(addresses);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey);
const account2 = wallet.connect(provider);

const factory = new ethers.Contract(
    addresses.factory,
    [
        'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
        'function getPair(address tokenA, address tokenB) external view returns (address pair)'
    ],
    account2
);

console.log(`BOT STARTED ON ${network}`);
factory.on('PairCreated', async (token0, token1, pairAddress) => {
    try {
        console.log('');
        console.log([`new token pair created on bsc:`, `Token0: ${token0}`, `Token1: ${token1}`, `Address: ${pairAddress}`].join("\n"));
    } catch(err) {
        console.log(`error: ${err}`)
    }
})