(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.addAsteroids();
    };
    this.ship = new Asteroids.Ship (this.randomPosition(), this);
    this.bullets = [];
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.NUM_ASTEROIDS = 40;

  Game.prototype.addAsteroids = function () {
    this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);
    return [x,y];
  };

  Game.prototype.draw = function (ctx, back) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(back, 0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (ast) {
      ast.draw(ctx);
    });
  };

  Game.prototype.move = function () {
    this.allObjects().forEach(function (ast) {
      ast.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    wx = pos[0] % Game.DIM_X;
    wy = pos[1] % Game.DIM_Y;

    if (wx < 0)
      wx = Game.DIM_X - wx;

    if (wy < 0)
      wy = Game.DIM_Y - wy;

    return [wx, wy];
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.allObjects().forEach(function(ast1) {
      that.allObjects().forEach(function(ast2) {
        if (ast1 === ast2) {
          return;
        }

        if (ast1.isCollidedWith(ast2)) {
          ast1.collideWith(ast2);
        }

      });
    });
  };

  Game.prototype.step = function() {
    this.move();
    this.checkCollisions();
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      astIdx = this.asteroids.indexOf(obj);
      if (astIdx === 0 )
        this.asteroids.shift();
      else
        this.asteroids.splice(astIdx, astIdx);

    } else {
      bulIdx = this.bullets.indexOf(obj);
      if (bulIdx === 0)
        this.bullets.shift();
      else
        this.bullets.splice(bulIdx, bulIdx);
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return pos[0] < 0 ||
           pos[0] > Game.DIM_X ||
           pos[1] < 0 ||
           pos[1] > Game.DIM_Y;
  }
})();
