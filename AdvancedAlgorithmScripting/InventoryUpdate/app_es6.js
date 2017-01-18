/*
Compare and update the inventory stored in a 2D array against a second 2D
array of a fresh delivery. Update the current existing inventory item
quantities (in arr1). If an item cannot be found, add the new item and
quantity into the inventory array. The returned inventory array should be
in alphabetical order by item.
*/

function updateInventory(arr1, arr2) {
  // All inventory must be accounted for or you're fired!
  const arr = arr1;
  // update values
  arr2.forEach((el2) => {
    let inventedItem = false;
    arr1.forEach((el1, i) => {
      if (el1[1] === el2[1]) {
        arr[i][0] += el2[0];
        inventedItem = true;
      }
    });
    if (!inventedItem) {
      arr.push(el2);
    }
  });
  // sort array and return it
  return arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return 0;
    }
    return (a[1] < b[1]) ? -1 : 1;
  });
}

// Example inventory lists
const curInv = [
[21, 'Bowling Ball'],
[2, 'Dirty Sock'],
[1, 'Hair Pin'],
[5, 'Microphone'],
];

const newInv = [
[2, 'Hair Pin'],
[3, 'Half-Eaten Apple'],
[67, 'Bowling Ball'],
[7, 'Toothpaste'],
];

updateInventory(curInv, newInv);
