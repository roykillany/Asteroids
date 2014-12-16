(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  MovingObject.prototype.draw = function (ctx) {
    // if (this instanceof Asteroids.Asteroid) {
    //   ctx.drawImage(Asteroids.Asteroid.IMAGE, this.pos[0], this.pos[1], this.radius * 2, this.radius * 2);
    // } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2, false);
      ctx.fill();
      if (this instanceof Asteroids.Ship) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0]+this.radius * this.dir[0], this.pos[1]+this.radius * this.dir[1]);
        ctx.fill;
      }
    // };
  };

  MovingObject.prototype.move = function () {
    x = this.pos[0] + this.vel[0];
    y = this.pos[1] + this.vel[1];
    this.pos = [x, y];

    if (this.game.isOutOfBounds([x, y])) {
      if (this.isWrappable()) {
        this.pos = this.game.wrap([x, y]);
      } else {
        this.game.remove(this);
      }
    };
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]),2) +
                    Math.pow((this.pos[1] - otherObject.pos[1]),2));
    return distance <= (this.radius + otherObject.radius);
  }

  MovingObject.prototype.collideWith = function(otherObject) {;};

  MovingObject.prototype.isWrappable = function () {
    return !(this instanceof Asteroids.Bullet);
  };
})();
