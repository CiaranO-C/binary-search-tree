function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(data) {
  const sortedData = mergeSort(data);
  let root = buildTree(sortedData);

  function buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const left = 0;
    const right = array.length - 1;
    const mid = Math.floor(left + right / 2);
    console.log(array[mid]);
    const node = Node(array[mid]);
    node.left = buildTree(array.slice(0, mid));
    node.right = buildTree(array.slice(mid + 1));

    return node;
  }

  function printTree() {
    prettyPrint(root);

    function prettyPrint(node, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  }

  function insert(value) {
    insertRecursive(root, value);

    function insertRecursive(root, value) {
      if (root === null) {
        root = Node(value);
        return root;
      }
      if (value < root.data) {
        root.left = insertRecursive(root.left, value);
      } else {
        root.right = insertRecursive(root.right, value);
      }
      return root;
    }
  }

  function deleteItem(value) {
    deleteRecursive(root, value);

    function deleteRecursive(root, value) {
      if (root === null) {
        return root;
      }
      if (value < root.data) {
        root.left = deleteRecursive(root.left, value);
      } else if (value > root.data) {
        root.right = deleteRecursive(root.right, value);
      } else {
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        }
        const minValue = findMinValue(root.right);
        root.right = deleteRecursive(root.right, minValue);
        root.data = minValue;
      }
      return root;
    }

    function findMinValue(root) {
      while (root.left != null) {
        root = root.left;
      }
      return root.data;
    }
  }

  function find(value) {
    const node = findRecursive(root, value);

    function findRecursive(root, value) {
      if (root === null) {
        console.log("Value not found");
        return null;
      } else if (root.data === value) {
        return root;
      } else {
        let targetNode = value < root.data ? root.left : root.right;
        targetNode = findRecursive(targetNode, value);
        return targetNode;
      }
    }
    return node;
  }

  function levelOrder(callback) {
    const breadthArray = [];
    levelOrderRecurse(callback);

    function levelOrderRecurse(callback, queue = [root]) {
      if (queue.length === 0) return null;

      const currentNode = queue.shift();
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      if (callback) callback(currentNode);

      breadthArray.push(currentNode.data);
      levelOrderRecurse(callback, queue);
    }
    if (!callback) return breadthArray;
  }

  function inOrder(callback) {
    const inOrderValues = [];
    inOrderRecursive();
    function inOrderRecursive(currentNode = root) {
      if (currentNode === null) return null;

      currentNode.left = inOrderRecursive(currentNode.left);
      if (callback) {
        callback(currentNode);
      } else {
        inOrderValues.push(currentNode.data);
      }
      currentNode.right = inOrderRecursive(currentNode.right);

      return currentNode;
    }
    if (!callback) return inOrderValues;
    return null;
  }

  function preOrder(callback) {
    const preOrderValues = [];
    preOrderRecursive();

    function preOrderRecursive(currentNode = root) {
      if (currentNode === null) return null;

      if (callback) {
        callback(currentNode);
      } else {
        preOrderValues.push(currentNode.data);
      }
      currentNode.left = preOrderRecursive(currentNode.left);
      currentNode.right = preOrderRecursive(currentNode.right);

      return currentNode;
    }
    if (!callback) return preOrderValues;
    return null;
  }

  function postOrder(callback) {
    const postOrderValues = [];
    postOrderRecursive();
    function postOrderRecursive(currentNode = root) {
      if (currentNode === null) return null;

      currentNode.left = postOrderRecursive(currentNode.left);
      currentNode.right = postOrderRecursive(currentNode.right);
      if (callback) {
        callback(currentNode);
      } else {
        postOrderValues.push(currentNode.data);
      }
      return currentNode;
    }
    if (!callback) return postOrderValues;
    return null;
  }

  function height(node) {
    if (node === null) return -1;
    const nodeHeight = Math.max(height(node.left), height(node.right)) + 1;

    return nodeHeight;
  }

  function depth(targetNode) {
    let nodeDepth = 0;
    depthRecursive(targetNode);
    function depthRecursive(targetNode, currentNode = root) {
      if (currentNode === targetNode) return;
      nodeDepth++;
      currentNode =
        targetNode.data < currentNode.data
          ? currentNode.left
          : currentNode.right;
      depthRecursive(targetNode, currentNode);
    }
    return nodeDepth;
  }

  function isBalanced() {
    const balanced = Boolean(balancedRecursive(root));
    function balancedRecursive(currentNode) {
      if (currentNode === null) return -1;
      
      const heightLeft = balancedRecursive(currentNode.left);
      const heightRight = balancedRecursive(currentNode.right);

      if(heightLeft === null || heightRight === null) return null;

      const heightDifference = Math.abs(heightLeft - heightRight);
      if (heightDifference <= 1) {
        const nodeHeight = Math.max(heightLeft, heightRight) + 1;
        return nodeHeight;
      }
      console.log("imbalance!");
      return null;
    }
    return balanced;
  }

  function rebalance() {
    const sortedData = mergeSort(inOrder());
    root = buildTree(sortedData);
  }

  return {
    root,
    buildTree,
    printTree,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function validateData(data) {
  if (!data || !Array.isArray(data)) {
    console.error("Ensure data is valid Array");
    return false;
  } else {
    return true;
  }
}

function mergeSort(data, sorted = []) {
  console.log(data);
  if (data.length === 1) {
    return data;
  } else if (!data) {
    console.error("data not defined!");
    return;
  } else {
    const mid = data.length / 2;
    const left = mergeSort(data.slice(0, mid));
    const right = mergeSort(data.slice(mid));
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] === right[j]) {
        sorted.push(left[i]);
        i++;
        j++;
      } else if (left[i] < right[j]) {
        console.log(`${left[i]} < ${right[j]}`);
        sorted.push(left[i]);
        i++;
      } else {
        console.log(`${left[i]} > ${right[j]}`);
        sorted.push(right[j]);
        j++;
      }
      console.log(`Sorted -- ${sorted}`);
    }
    if (i >= left.length) {
      sorted = sorted.concat(right.slice(j));
    } else {
      sorted = sorted.concat(left.slice(i));
    }
  }
  return sorted;
}

let x = mergeSort([3, 5, 4, 1, 3, 2]);
console.log(x);

let data = [1, 5, 8, 11, 22, 25, 31, 40, 42];

let tree = Tree(data);

tree.printTree();

//tree.insert(41);
//tree.printTree();

//tree.deleteItem(22);
//tree.printTree();

console.log(tree.find(5));

function printNodeValue(node) {
  console.log(node.data);
}

/*tree.levelOrder(printNodeValue);
console.log(tree.levelOrder());

tree.inOrder(printNodeValue);
console.log(tree.inOrder());

tree.preOrder(printNodeValue);
console.log(tree.preOrder());

tree.postOrder(printNodeValue);
console.log(tree.postOrder());*/

console.log(tree.height(tree.find(8)));
console.log(tree.height(tree.find(42)));

console.log(tree.depth(tree.find(40)));

/*tree.insert(50);
tree.insert(55);
tree.insert(56);
tree.insert(57);
tree.insert(58);
tree.insert(59);
tree.printTree();*/
console.log("balancing test");
console.log(tree.isBalanced());

tree.insert(12);
tree.insert(15);

tree.printTree();
console.log(tree.isBalanced());

tree.rebalance();
tree.printTree();
console.log(tree.isBalanced());
