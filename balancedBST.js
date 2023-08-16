class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...removeDuplicates(mergeSort(array))];
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const newNode = new Node(array[mid]);

    newNode.left = this.buildTree(array.slice(0, mid));
    newNode.right = this.buildTree(array.slice(mid + 1));
    return newNode;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) return (currentNode = new Node(value));
    if (currentNode.value === value) return;

    currentNode.value < value
      ? (currentNode.right = this.insert(value, currentNode.right))
      : (currentNode.left = this.insert(value, currentNode.left));

    return currentNode;
  }

  delete(value, currentNode = this.root) {
    if (currentNode === null) return null;

    if (value === currentNode.value) {
      //check if node has both childs or either one of them
      if (currentNode.left === null && currentNode.right === null) return null;
      if (currentNode.left === null) return currentNode.right;
      if (currentNode.right === null) return currentNode.left;

      let tempNode = currentNode.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }
      currentNode.value = tempNode.value;
      currentNode.right = this.delete(tempNode.value, currentNode.right);
      return currentNode;
    } else if (value < currentNode.value) {
      currentNode.left = this.delete(value, currentNode.left);
      return currentNode;
    } else {
      currentNode.right = this.delete(value, currentNode.right);
      return currentNode;
    }
  }

  find(value, currentNode = this.root) {
    if (currentNode === null) return null;
    if (currentNode.value === value) return currentNode;

    return value < currentNode.value
      ? this.find(value, currentNode.left)
      : this.find(value, currentNode.right);
  }

  levelOrder() {
    if (!this.root) return [];

    const queue = [this.root];
    const result = [];

    while (queue.length) {
      let len = queue.length;
      result.push(queue.map((node) => node.value));

      while (len--) {
        let node = queue.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        // if (callback) callback(node);
      }
    }
    // if (!callback) return result;
    return result;
  }

  preorderTraversal() {
    if (!this.root) return [];

    const stack = [this.root];
    const result = [];

    while (stack.length) {
      const node = stack.pop(this.root);

      result.push(node.value);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
    return result;
  }

  inorderTraversal() {
    if (!this.root) return [];
    const result = [];

    const inorder = (node) => {
      if (!node) return null;

      if (node.left) inorder(node.left);
      result.push(node.value);
      if (node.right) inorder(node.right);
    };

    inorder(this.root);
    return result;
  }

  postorderTraversal() {
    if (!this.root) return [];
    const result = [];

    const postorder = (node) => {
      if (!node) return null;

      if (node.left) postorder(node.left);
      if (node.right) postorder(node.right);
      result.push(node.value);
    };

    postorder(this.root);
    return result;
  }

  height(node = this.root) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(nodeVal, node = this.root, edgeCount = 0) {
    if (node === null) return 0;
    if (node.value === nodeVal) return edgeCount;

    if (node.value < nodeVal) {
      return this.depth(nodeVal, node.right, edgeCount + 1);
    } else {
      return this.depth(nodeVal, node.left, edgeCount + 1);
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftNode = this.height(node.left);
    const rightNode = this.height(node.right);

    const heightDifference = Math.abs(leftNode - rightNode);

    return (
      heightDifference <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    if (this.isBalanced()) return;

    const inorderList = this.inorderTraversal();
    this.root = this.buildTree(inorderList);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
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
}

function mergeSort(array) {
  if (array.length <= 1) return array;
  const newArray = [];

  const mid = Math.floor(array.length / 2);

  const leftArr = mergeSort(array.slice(0, mid));
  const rightArr = mergeSort(array.slice(mid));

  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      newArray.push(leftArr.shift());
    } else {
      newArray.push(rightArr.shift());
    }
  }
  return [...newArray, ...leftArr, ...rightArr];
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

const bts = new Tree([1, 2, 2, 3, 3, 5, 10, 6, 7, 50, 45, 67, 88, 99, 9]);
console.log(bts.prettyPrint());
console.log(bts.isBalanced());
