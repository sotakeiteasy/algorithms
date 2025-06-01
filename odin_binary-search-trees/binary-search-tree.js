class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this.#buildTreeRecoursive(sortedArray, 0, sortedArray.length - 1);
  }

  #buildTreeRecoursive(array, start, end) {
    if (start > end) return null; // why > not >= ?
    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(array[mid]);
    root.left = this.#buildTreeRecoursive(array, start, mid - 1);
    root.right = this.#buildTreeRecoursive(array, mid + 1, end);

    return root;
  }

  deleteNode(value, root = this.root) {
    if (root === null) return null;

    if (root.value > value) {
      root.left = this.deleteNode(value, root.left);
    } else if (root.value < value) {
      root.right = this.deleteNode(value, root.right);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let curr = root.right;

      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }

      root.value = curr.value;
      root.right = this.deleteNode(root.value, root.right);
    }

    if (!this.isBalanced()) this.rebalance();
    return root;
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    if (root.value === value) return root;

    if (value < root.value) root.left = this.insert(value, root.left);
    if (value > root.value) root.right = this.insert(value, root.right);

    // if (!this.isBalanced()) this.rebalance();
    return root;
  }

  find(value, root = this.root) {
    if (root === null) return null;
    if (root.value === value) return root; // does not work
    if (value < root.value) return this.find(value, root.left);
    if (value > root.value) return this.find(value, root.right);
  }

  levelOrder(callback, root = this.root) {
    if (!callback) throw new Error("callback is required!");
    if (root === null) return null;
    const queue = [];
    queue.push(root);
    while (queue.length !== 0) {
      let current = queue.shift();

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);

      callback(current.value, false);
    }
  }

  levelOrderRecoursiveHelper(nodes, callback) {
    if (nodes.length === 0) return;
    const next = [];
    for (const node of nodes) {
      callback(node.value, false);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    this.levelOrderRecoursiveHelper(next, callback);
  }

  levelOrderRecoursive(callback, root = this.root, queue = []) {
    if (!callback) throw new Error("callback is required!");
    if (root === null) return null;
    this.levelOrderRecoursiveHelper([root], callback);
  }

  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("callback is required!");
    if (root === null) return null;

    callback(root.value, false);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("callback is required!");
    if (root === null) return null;

    this.preOrder(callback, root.left);
    callback(root.value, false);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("callback is required!");
    if (root === null) return null;

    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
    callback(root.value, false);
  }

  height(value, root = this.root) {
    if (root === null) return null;
    if (root.value === value) return getHeight(root);
    if (value < root.value) return this.height(value, root.left);
    if (value > root.value) return this.height(value, root.right);

    function getHeight(node) {
      if (node === null) return -1;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }
  }

  depth(value, root = this.root, count = 0) {
    if (root === null) return null;
    if (root.value === value) return count;
    if (value < root.value) return this.depth(value, root.left, count + 1);
    if (value > root.value) return this.depth(value, root.right, count + 1);
  }

  isBalancedRecoursive(root) {
    if (root === null) return 0;
    let leftHeight = this.isBalancedRecoursive(root.left);
    let rightHeight = this.isBalancedRecoursive(root.right);

    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(rightHeight - leftHeight) > 1
    )
      return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(root = this.root) {
    return this.isBalancedRecoursive(root) > 0;
  }

  rebalance() {
    let array = [];
    this.levelOrder((edge) => array.push(edge));

    this.root = this.#buildTree(array);
    return this;
  }
}

module.exports = Tree;
