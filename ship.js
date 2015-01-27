(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (pos, game) {
    Ship.RADIUS = 20;
    Ship.COLOR = "#000000";
    Ship.DIR = [0, 1];
    this.lives = 3;
    this.dir = Ship.DIR;
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: [0,0],
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      game: game
    });
  }
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.dir = impulse;
    var x = this.vel[0] + impulse[0];
    var y = this.vel[1] + impulse[1];
    var speed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (speed < 6) {
      this.vel = [x, y];
    }
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.fireBullet = function() {
    if (this.game.bullets.length < 3){
      var bullet = new Asteroids.Bullet(this.pos, this.game);
      this.game.bullets.push(bullet);
    }
  }

})();
