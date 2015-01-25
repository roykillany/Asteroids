var curriedSum = function (numArgs) {
  var numbers = [];
  var n = numArgs;
  var _curriedSum = function (num) {
    numbers.push(num);
    if (numbers.length === n) {
      var sum = 0;
      for (var i = 0; i < n; i++) {
        sum += numbers[i];
      }
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
};
