Function.prototype.curry = function(numArgs) {
  var that = this;
  var args = [];
  var n = numArgs;
  var _func = function(arg) {
    args.push(arg);
    if (args.length === n) {
      return that.apply(this, args);
    } else {
      return _func;
    }
  }
  return _func;
}
