const {ethers} = require('hardhat');
const { expect, assert } = require("chai");
describe('simpleStorage', function() {
  let simpleStorageFactory, simpleStorage
  beforeEach(async function() {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favourite number of 0", async function() {
    const currVal = await simpleStorage.retrieve();
    const expectedValue = "0"
    assert.equal(currVal.toString(), expectedValue)
  })

  it("should update when we call the store",async function() {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const currVal = await simpleStorage.retrieve();
    assert.equal(currVal.toString(), expectedValue)
  })

  it('should work correctly with struct and peoples array',async function () {
    const expectedName = "Prathik";
    const expectedFavNo = "5";

    const transactionResponse = await simpleStorage.addPerson(expectedName,expectedFavNo);
    await transactionResponse.wait(1);

    const {favoriteNumber,name} = await simpleStorage.people(0);
    assert.equal(name,expectedName);
    assert.equal(favoriteNumber,expectedFavNo);
  })
})