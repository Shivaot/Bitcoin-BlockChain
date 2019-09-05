const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain' , () => {
    let bc,bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('starts with a genesis block', ()=>{
        //writing an assertion
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block',()=> {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        bc2.addBlock('foo');

        expect(bc.isValidChain(bc2.chain)) == true;
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'bad -data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a chain with a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'not foo';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces Blockchain with valid chain',() =>{
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain) == bc2.chain;
    });

    it('new chain should be longer',() =>{
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });

});
