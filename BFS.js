const levelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  const result = [];

  while (queue.length) {
    let len = queue.length;
    result.push(queue.map((node) => node.value));
    while (len--) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
};

/* Level Order Recursive */
const leveOrderRec = function (root) {
  if (!root) return [];

  const result = [];
  let level = 0;
  const readNode = function (node, level) {
    if (!node) return;
    if (!result[level]) {
      result.push([node.value]);
    } else {
      result[level].push(node.value);
    }
    readNode(node.left, level + 1);
    readNode(node.right, level + 1);
  };
  readNode(root, level);
  return result;
};
