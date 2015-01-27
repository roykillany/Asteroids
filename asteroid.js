(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    var COLOR = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C",
    "D", "E", "F"];
    Asteroid.COLOR = "#" + COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))];
    Asteroid.RADIUS = Math.floor(Math.random() * 50) + 25
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
    } else if(otherObject instanceof Asteroids.Bullet){
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };
})();
