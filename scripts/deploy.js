// imports
const { ethers, run } = require('hardhat');

//async function
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract .......");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`deployed contract to : ${simpleStorage.address}`);
  if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
    await simpleStorage.deployTransaction.wait(6);// wait for 6 blocks before verificaiton
    await verify(simpleStorage.address,[]);
  }
  const currentVal = await simpleStorage.retrieve();
  console.log(`current val is : ${currentVal}`);

  // Update the value
  const transactionResponse =  await simpleStorage.store(7); // store value as 7
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`updated value is : ${updatedValue}`);

}

// verify the contract that is deployed
async function verify(contactAddress, args) {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contactAddress,
      constructorArguments: args,
    })
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    }
    else {
      console.log(error);
    }
  }


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
