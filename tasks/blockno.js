const {task} = require('hardhat/config');

task("BlockNumber","Print the current block number").setAction(
    async (task, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`current Blocknumbrer : ${blockNumber}`);
    }
);

module.exports = {}