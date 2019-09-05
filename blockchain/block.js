const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY , MINE_RATE } = require('../config');

class Block{
    constructor(timestamp,lastHash,data,hash,nonce,difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        return `Block -
        Timestamp : ${this.timestamp}
        Data      : ${this.data}
        Nonce     : ${this.nonce}
        Last Hash : ${this.lastHash.substring(0,10)}
        Hash      : ${this.hash.substring(0,10)}
        Difficulty: ${this.difficulty}`;
    }

    static genesis(){
        return new this('Genesis time','-----',[],'f1r57-h45h',0,DIFFICULTY);
    }

    static mineBlock(lastBlock,data){
        let hash,timestamp;
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        let nonce = 0;


        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock,timestamp);
            hash = Block.hash(timestamp,lastHash,data,nonce,difficulty);
        } while (hash.substring(0,difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp,lastHash,data,hash,nonce,difficulty);
    }

    static hash(timestamp,lastHash,data,nonce,difficulty){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block){
        const {timestamp,lastHash,data,nonce,difficulty} = block;

        return Block.hash(timestamp,lastHash,data,nonce,difficulty);
    }

    static adjustDifficulty(lastBlock,currTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currTime ? difficulty + 1 : difficulty -1;
        return difficulty;
    }
}

module.exports = Block;
