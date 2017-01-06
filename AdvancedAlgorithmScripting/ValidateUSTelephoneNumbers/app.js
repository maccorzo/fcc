function telephoneCheck(str) {
  var re = /(^1?\s?\d{3}-\d{3}-\d{4}$)|(^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$)|(^1?\s?\d{3}\s?\d{3}\s?\d{4})$/g;
  return re.test(str);
}

console.log(telephoneCheck("27576227382"));
