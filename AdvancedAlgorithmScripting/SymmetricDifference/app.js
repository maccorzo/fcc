function sym(args) {
  // convert arguments object to array
  var arr = Array.prototype.slice.call(arguments);
  rArr = [];

  for (var i = 0 ; i < arr.length ; i++) {
    rArr = arr[i]
    // remove duplicate numbers
    .filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    })
    // compare arrays
    .filter(function(el) {
      return rArr.indexOf(el) == -1;
    })
    .concat(rArr.filter(function(el) {
      return arr[i].indexOf(el) == -1;
    }))
    .sort();
  }
  return rArr;
}

// test
console.log(sym([1, 2, 3], [5, 2, 1, 4]));
console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]));
