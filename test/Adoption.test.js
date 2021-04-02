const Adoption = artifacts.require('Adoption');
const assert = require('chai').assert;
const truffleAssert = require('truffle-assertions');

contract('Adoption', (accounts) => {
  let adoption;
  let expectedPetId;

  before(async () => {
    adoption = await Adoption.deployed();
  });

  describe('adopting a pet and retrieving account addresses', async () => {
    before('adopt a pet using accounts[0]', async () => {
      await adoption.adopt(7, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });

    it('should fail if another user tries to adopt the same pet', async () => {
      await truffleAssert.reverts(
        adoption.adopt(7, { from: accounts[1] }),
        'Cannot adopt an already adopted pet'
      );
    });
  });

  describe('adopting a pet and retrieving account addresses', async () => {
    before('adopt a pet using accounts[0]', async () => {
      await adoption.adopt(8, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });

    it('can fetch the address of an owner by pet id', async () => {
      const adopter = await adoption.adopters(8);
      assert.equal(
        adopter,
        expectedAdopter,
        'The owner of the adopted pet should be the first account.'
      );
    });

    it("can fetch the collection of all pet owners' addresses", async () => {
      const adopters = await adoption.getAdopters();
      assert.equal(
        adopters[8],
        expectedAdopter,
        'The owner of the adopted pet should be in the collection.'
      );
    });

    it('can remove adoption of the pet', async () => {
      await adoption.removeAdoption(8, { from: accounts[0] });

      const adopters = await adoption.getAdopters();
      assert.equal(
        adopters[8],
        '0x0000000000000000000000000000000000000000',
        'zero address should be in the collection.'
      );
    });
  });
});
