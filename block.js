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
        Last Hash: ${this.lastHash.substring(0,2)}
        Hash     : ${this.hash.substring(0,2)}`;
    }
}

module.exports = Block;