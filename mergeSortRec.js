/****  Merge Sort Recursive ****/
function mergeSortRec(unsortedArr) {
  if (unsortedArr.length <= 1) return unsortedArr;

  const mid = Math.floor(unsortedArr.length / 2);
  const leftArr = unsortedArr.slice(0, mid);
  const rightArr = unsortedArr.slice(mid);

  return merge(mergeSortRec(leftArr), mergeSortRec(rightArr));
}

function merge(left, right) {
  const result = [];
  let indexL = 0;
  let indexR = 0;

  while (indexL < left.length && indexR < right.length) {
    if (left[indexL] < right[indexR]) {
      result.push(left[indexL]);
      indexL++;
    } else {
      result.push(right[indexR]);
    }
  }

  if (left[indexL]) {
    const unaddedElements = left.slice(indexL);
    result.push(...unaddedElements);
  } else {
    const unaddedElements = right.slice(indexR);
    result.push(...unaddedElements);
  }
}
console.log(mergeSortRec([10, 7, 8, 9, 1, 5])); // [1, 5, 7, 8, 9, 10]
console.log(mergeSortRec([30, 20, 10, 50, 22, 33, 55])); //[10, 20, 22, 30, 33, 50, 55]
