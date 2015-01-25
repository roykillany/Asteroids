(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function(subclass, superclass) {
    function Surrogate() {};

    Surrogate.prototype = superclass.prototype;
    subclass.prototype = new Surrogate();
  };

  Util.randomVec = function(length) {
    var angle = Math.random() * 2 * Math.PI;
    var i = Math.cos(angle);
    var j = Math.sin(angle);
    return[length*i, length*j];
  };

})();
