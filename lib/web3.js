import Web3 from 'web3';

METAMASK = false;
NETWORK = 'rinkeby'

switch (NETWORK) {
  case 'mainnet':
    PROVIDER = 'https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E'
    //CONTRACT_ADDRESS = '0x916076A204e3b2c8F064E6330b94b04Da2D79F8A'
    break;
  case 'rinkeby':
    PROVIDER = 'https://rinkeby.infura.io/kak6M2Qgf7oHycGaCI2E'
    CONTRACT_ADDRESS = '0x85e02fa728e4ec277ea72ce8d6579f9ccc50a303'
    break;
  default: // 'mainnet'
    PROVIDER = 'https://ropsten.infura.io/kak6M2Qgf7oHycGaCI2E'
    //CONTRACT_ADDRESS = '0x948b9988c2cbccb3cc021ae69b4b9da4da71b1d2'
}

REFRESH_RATE = 1000;
GAS = 5000000;
GAS_PRICE = 20000000000;

// check if web3 is available
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  METAMASK = true;
} else {
  //set the provider to ropsten, will only work for view functions
  web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER));
}

//AppContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

if (Meteor.isClient) {
  // Get coinbase, then  keeps refreshing
  function updateCoinbase() {
    if (METAMASK)
      web3.eth.getCoinbase()
      .then(function (coinbase) {
        Session.set("coinbase", coinbase)
      });
  }

  updateCoinbase();
  window.setInterval(function () {
    updateCoinbase();
  }, REFRESH_RATE)
}
