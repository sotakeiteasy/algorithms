const Tree = require("./binary-search-tree");

function createArray(length) {
  let array = [];

  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * length));
  }

  return array;
}

const tree = new Tree(createArray(15));

console.log("\n --- Tree ---------- \n");
tree.prettyPrint();
console.log("\n is tree balanced? ", tree.isBalanced());

console.log(`\n --- delete ${tree.root.left.value} ---------- \n`);
tree.deleteNode(tree.root.left.value);
console.log(`\n --- delete ${tree.root.left.value} ---------- \n`);
tree.deleteNode(tree.root.left.value);
tree.prettyPrint();
console.log("\n is tree balanced? ", tree.isBalanced());

console.log("\n --- Tree: insert 6 ---------- \n");
tree.insert(6);

tree.prettyPrint();

console.log("\ntry to find '6' -", tree.find(6));

function orderPrint() {
  let array = [];
  return function (value, isFinal) {
    if (!isFinal) array.push(value);
    if (isFinal) console.log(`\n ${isFinal}:\n`, array);
  };
}

let counterLevelOrder = orderPrint();
tree.levelOrder(counterLevelOrder);
counterLevelOrder(null, tree.levelOrder.name);

let counterLevelOrderRecoursive = orderPrint();
tree.levelOrderRecoursive(counterLevelOrderRecoursive);
counterLevelOrderRecoursive(null, tree.levelOrderRecoursive.name);

let counterPreOrder = orderPrint();
tree.preOrder(counterPreOrder);
counterPreOrder(null, tree.preOrder.name);

let counterInOrder = orderPrint();
tree.inOrder(counterInOrder);
counterInOrder(null, tree.inOrder.name);

let counterPostOrder = orderPrint();
tree.postOrder(counterPostOrder);
counterPostOrder(null, tree.postOrder.name);

let edge = 2;
console.log(`\n height for ${edge}`, tree.height(edge));
console.log("\n depth for 6", tree.depth(6));

tree.insert(120);
tree.insert(140);
tree.insert(150);
tree.insert(160);

console.log("\n --- Tree: after insert numbers > 100 ---------- \n");
tree.prettyPrint();

console.log("\n is tree balanced? ", tree.isBalanced());

console.log("\n rebalance tree...");
tree.rebalance();

console.log("\n --- Tree: after rebalance ---------- \n");
tree.prettyPrint();
