function pairwise(arr, arg) {

  var used = [];

  for (var x = 0; x < arr.length - 1; x++) {
    for (var y = x+1; y < arr.length; y++)
      if (arr[x] + arr[y] === arg & !used.includes(x) && !used.includes(y)) {
        used.push(x, y);
      }
    }

    if (used.length === 0) {
      return 0;
    }  


    return used.reduce(function (pre, cur) { return pre + cur; });
  }

  console.log(pairwise([1,1,1], 2), 'answer is 1');
  console.log(pairwise([0, 0, 0, 0, 1, 1], 1), 'answer is 10');

