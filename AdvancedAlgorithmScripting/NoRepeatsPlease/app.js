function permAlone(str) {
  var results = [];
  
  function permute(arr, prev) {
    var cur;
    prev = prev || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0 && prev.concat(cur).join('').match(/([a-zA-Z])\1/) === null) {
        results.push(prev.concat(cur));
      }
      permute(arr.slice(), prev.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }
  
  return permute(str.split('')).length;
  
}

const answer = permAlone('aab');
console.log(answer);