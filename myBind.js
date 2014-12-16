var myBind = function(myObj) {
  var func = this;
  var myArgs = Array.prototype.slice.apply(arguments, 1);
  return function () {
    var funcArgs = Array.prototype.slice.apply(arguments);
    var allArgs = funcArgs.concat(myArgs);
    return func.apply(myObj, allArgs);
  };
};
