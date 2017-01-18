const sym = (...args) => {
  let rArr = [];
  for (let i = 0; i < args.length; i += 1) {
    rArr = args[i]
    .filter((elem, index, self) => index === self.indexOf(elem))
    .filter(el => rArr.indexOf(el) === -1)
    .concat(rArr.filter(el => args[i].indexOf(el) === -1))
    .sort();
  }
  return rArr;
};
// test
console.log(sym([1, 2, 3], [5, 2, 1, 4]));
console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]));
