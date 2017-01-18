/*
Compare and update the inventory stored in a 2D array against a second 2D
array of a fresh delivery. Update the current existing inventory item
quantities (in arr1). If an item cannot be found, add the new item and
quantity into the inventory array. The returned inventory array should be
in alphabetical order by item.
*/

function updateInventory(arr1, arr2) {
  // All inventory must be accounted for or you're fired!

  // update values
  arr2.forEach(function(el2) {
    var inventedItem = false;
    arr1.forEach(function(el1, i) {
      if (el1[1] === el2[1]) {
        arr1[i][0] += el2[0];
        inventedItem = true;
      }
    });
    if (!inventedItem) {
      arr1.push(el2);
    }
  });
  // sort array and return it
  return arr1.sort(function(a, b) {
    return (a[1] > b[1]) ? 1 : -1;
  });
}

// Example inventory lists
var curInv = [
[21, 'Bowling Ball'],
[2, 'Dirty Sock'],
[1, 'Hair Pin'],
[5, 'Microphone'],
];

var newInv = [
[2, 'Hair Pin'],
[3, 'Half-Eaten Apple'],
[67, 'Bowling Ball'],
[7, 'Toothpaste'],
];

var a = updateInventory(curInv, newInv);
console.log(a);
