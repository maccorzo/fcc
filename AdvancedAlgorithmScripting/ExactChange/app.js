function checkCashRegister(price, cash, cid) {
  var change = [];
  var moneys = [
  ['ONE HUNDRED', 10000, 8],
  ['TWENTY', 2000, 7],
  ['TEN', 1000, 6],
  ['FIVE', 500, 5],
  ['ONE', 100, 4],
  ['QUARTER', 25, 3],
  ['DIME', 10, 2],
  ['NICKEL', 5, 1],
  ['PENNY', 1, 0]];

  
  // multibly by hundred so penny = 1 (penny) and hundred = 10000 (penny)
  var back = (cash * 100) - (price * 100);
  var totalChange = 0;
  moneys.forEach( function(element, i) {
    if (back / element[1] >= 1 & back > 0) {
      var cashInDrawer = cid[element[2]][1];
      var sumOfThisCurrency = Math.min(Math.floor(back / element[1])*element[1] / 100, cashInDrawer);
      change.unshift([element[0], sumOfThisCurrency]);
      back -= sumOfThisCurrency * 100;
      totalChange += sumOfThisCurrency;
    }
  });
  if (totalChange < cash - price) {
    return 'Insufficient Funds';
  }

  // Here is your change, ma'am.
  return change;
}
//var a = checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
var a = checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log(a);