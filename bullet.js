(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, game) {
    var ship = game.ship;
    console.log(ship.dir);
    var vel = [ship.dir[0] * 7, ship.dir[1] * 7];
    var speed = Math.sqrt()
    Bullet.COLOR = "#000000";
    Bullet.RADIUS = 2;
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
