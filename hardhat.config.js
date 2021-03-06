require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");// for verificaiton
require("./tasks/blockno");
/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
  networks : {
    rinkeby : {
      url : RINKEBY_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId : 4,
    },
  },
  solidity: "0.8.9",
  etherscan : {
    apiKey : ETHERSCAN_API_KEY,
  },
  localhost : {
    url : "http://127.0.0.1:8545/",
    chainId : 31337,
  },
};
