const Block = require('./block');

describe('Block' , ()=> {
    let data,lastBlock,block;

    beforeEach(() => {
         data = 'bar';
         lastBlock = Block.genesis();
         block = Block.mineBlock(lastBlock,data);
    });

    it('sets the `data` to match the input',() => {
        //writing an assertion
        expect(block.data).toEqual(data);
    });

    it('sets the lastHash to match the hash of the last block',() => {
        //writing an assertion
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});
