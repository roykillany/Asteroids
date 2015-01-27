(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C",
  "D", "E", "F"];

  var Bullet = Asteroids.Bullet = function(pos, game) {
    var ship = game.ship;
    console.log(ship.dir);
    var vel = [ship.dir[0] * 9, ship.dir[1] * 9];
    var speed = Math.sqrt()
    Bullet.COLOR = "#" + COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))] +
    COLOR[Math.floor((Math.random() * COLOR.length))];
    Bullet.RADIUS = 3;
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: vel,
      color: Bullet.COLOR,
      radius: Bullet.RADIUS,
      game: game
    });
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

})();
