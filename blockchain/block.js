const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp,lastHash,data,hash){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
        this.hash = hash;
    }

    toString(){
        return `Block -
        Timestamp: ${this.timestamp}
        Data     : ${this.data}
        Last Hash: ${this.lastHash.substring(0,10)}
        Hash     : ${this.hash.substring(0,10)}`;
    }

    static genesis(){
        return new this('Genesis time','-----',[],'f1r57-h45h');
    }

    static mineBlock(lastBlock,data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp,lastHash,data);

        return new this(timestamp,lastHash,data,hash);
    }

    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block){
        const {timestamp,lastHash,data } = block;

        return Block.hash(timestamp,lastHash,data);
    }
}

module.exports = Block;
