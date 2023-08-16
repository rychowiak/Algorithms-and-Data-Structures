const isBalanced = function (root) {
  if (root === null) return true;
  if (height(root) === -1) return false;
  return true;
};

const height = function (root) {
  if (root === null) return 0;
  const leftHeight = height(root.left);
  const rightHeight = height(root.right);
  if (leftHeight === -1 || rightHeight === -1) return -1;
  if (Math.abs(leftHeight - rightHeight) > 1) return -1;
  return Math.max(leftHeight, rightHeight) + 1;
};
