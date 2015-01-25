(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    Asteroid.COLOR = "#00FF00";
    Asteroid.RADIUS = Math.floor(Math.random() * 50) + 1;0
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: Asteroids.Util.randomVec(Math.random() * 10),
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      game: game
    });
  }

  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = './transpizza.gif';

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
