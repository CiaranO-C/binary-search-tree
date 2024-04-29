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
    const node = Node(value);
    let parentNode = root;
    let currentNode = root;
    while (currentNode != null) {
      parentNode = currentNode;
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    value < parentNode.data
      ? (parentNode.left = node)
      : (parentNode.right = node);
  }

  function deleteItem(value){
    
  }


  return {
    root,
    buildTree,
    printTree,
    insert,
    deleteItem,
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