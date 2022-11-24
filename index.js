// The getElementById api and querySelector allows us to evade this heavy recursive model

//GENERATOR FUNCTION MUST BE AT TOP
// TAKES PLACE OF THE getElementById API
function* traversePreOrder(node) {
  if (!node) return;

  yield node; //pause and don't return anything yet
  for (let child of node.children) {
    //delegate or point to traversePreOrder and pass in each child
    yield* traversePreOrder(child);
  }
}

// make class names with .sibling styled blue
const siblingEl = document.querySelectorAll('.sibling');
Array.from(siblingEl).forEach((sib) => (sib.style.color = 'blue'));

//PARAMETERS ARE THE SELECTOR AND ROOT NODE
function selectAll(selector, root) {
  let result = [];
  for (let node of traversePreOrder(root)) {
    if (node.matches(selector)) {
      node.style.color = 'red';
      result.push(node);
    }
  }
  return result;
}

function myQuerySelectorAll(path, node = document.body) {
  let result = [];
  //BASE CASE
  if (path.length === 0) return result;

  //IF NO PATH PROVIDED START FROM THE DOCUMENT.BODY
  let root = node;

  //THIS SETS THE SELECTOR PATH TO FIRST ELEMENT EX: DOCUMENT.QUERYSELECTORALL('DIV')[0]
  const selector = path[0];

  //IF THERE IS ONLY ONE SELECTOR IN PATH, TRAVERSE USING SELECTALL FUNCTION
  if (path.length === 1) return selectAll(selector, root);

  //CHECK IF THE CURRENT NODE MATCHES THE CURRENT SELECTOR PATH  AND SLICE OFF IT'S PARENT  FOR SUBSEQUENT SELECTORS
  const newPath = root.matches(selector) ? path.slice(1) : path;
  //   LOOP THROUGH THE ROOT CHILDREN RETURN ARRAY OF NODES AND ADD ANY CAUGHT IN THE RECURSION
  for (let child of root.children) {
    result = [...result, ...myQuerySelectorAll(newPath, child)];
  }
  //NOTHING FOUND
  return result;
}
const findNestedPTags = myQuerySelectorAll(['div', 'p']);
// const findNestedX = myQuerySelectorAll(['div','p.x']);

console.log('findNestedPTags', findNestedPTags);
// console.log('findNested', findNestedX);
