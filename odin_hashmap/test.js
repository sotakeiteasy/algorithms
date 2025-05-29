const { HashMap } = require("./hashmap");

const test = new HashMap();

console.log(
  "current load and capacity before add: ",
  test.length() / test.capacity,
  test.capacity
);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log("entries after add: ", test.entries());

console.log(
  "load and capacity after add: ",
  test.length() / test.capacity,
  test.capacity
);

console.log(test.get("lion"));
test.set("lion", "silver");
console.log(test.get("lion"));

console.log(test.length() / test.capacity, test.capacity);
console.log(test.entries());

test.set("moon", "silver");

console.log(test.entries());
console.log(test.length());
console.log(test.length() / test.capacity, test.capacity);

console.log(test.remove("hat"));
console.log(test.remove("grape"));
console.log(test.remove("hat"));
console.log(test.entries());

// console.log(test.map);
console.log(test.get("dog"));
console.log(test.keys());
console.log(test.values());
console.log(test.clear());
// console.log(test.map)
console.log(test.length());
console.log(test.entries());
