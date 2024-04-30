function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(data) {
  const sortedData = mergeSort(data);
  const root = buildTree(sortedData);

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

  return {
    root,
    buildTree,
    printTree,
    insert,
    deleteItem,
    find,
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

tree.insert(41);
tree.printTree();

tree.deleteItem(22);
tree.printTree();

console.log(tree.find(5));
