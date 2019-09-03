const Block = require('./block')

// const block = new Block("foo","zoo","Bar","rey");
// console.log(block.toString());
// console.log(Block.genesis().toString());

const fooBlock = Block.mineBlock(Block.genesis(),"foo");
console.log(fooBlock.toString());
