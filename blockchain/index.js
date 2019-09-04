const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);

        return block;
    }

    //running a validation on each block
    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for(let i=1;i<chain.length;i++){
            const block = chain[i];
            const lastBlock = chain[i-1];

            if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)){
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("Received Chain is smaller than the original one");
            return;
        }
        else if (!this.isValidChain(newChain)) {
            console.log("Received chain in not valid");
            return;
        }

        console.log('Replacing Blockchain with new Chain');
        this.chain = newChain;
    }
}

module.exports = Blockchain;
