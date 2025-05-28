"use strict";

const { LinkedList } = require("./script");
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("bird");
console.log(list.toString());
console.log("Size:", list.size());
console.log("Tail:", list.tail());
console.log("Element at index 0:", list.at(0));
console.log("After pop:", list.pop());
console.log("Head:", list.head);
list.prepend("dino");
console.log("After prepend dino:", list.toString());
console.log("Contains dog:", list.contains("dog"));
list.insertAt("Dragon", 2);
console.log("After insert Dragot at 2:", list.toString());
list.removeAt(0);
console.log("After delete element at 0:", list.toString());
