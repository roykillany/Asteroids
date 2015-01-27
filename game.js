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
    $("div#candy-count").html("<strong>Candies on screen: " + this.asteroids.length + "</strong>");
    $("div#lives").html("<strong>Lives: " + this.ship.lives + "</strong>");
  };

  Game.DIM_X = 1600;
  Game.DIM_Y = 750;
  Game.NUM_ASTEROIDS = 1;

  Game.prototype.addAsteroids = function () {
    this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
  };

  Game.prototype.addBabyAsteroids = function(pos){
    for(var i = 0; i < 2; i++){
      this.asteroids.push(new Asteroids.Asteroid(pos, this))
    }
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);
    return [x,y];
  };

  Game.prototype.startPosition = function(){
    var x = Math.floor(0.5 * Game.DIM_X);
    var y = Math.floor(0.5 * Game.DIM_Y);
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
          if((ast1 instanceof Asteroids.Ship && ast2 instanceof Asteroids.Asteroid) ||
            (ast1 instanceof Asteroids.Asteroid && ast2 instanceof Asteroids.Ship)){
            if(that.ship.lives > 1){
              that.ship.lives--;
              ast1.collideWith(ast2);
              $("div#lives").empty();
              $("div#lives").html("<strong>Lives: " + that.ship.lives + "</strong>");
            } else {
              that.ship.lives--;
              $("div#lives").empty();
              $("div#lives").html("<strong>Lives: " + that.ship.lives + "</strong>");
              clearInterval(loop);
              $("a.restart").removeClass("hidden");
            }
          } else {
            ast1.collideWith(ast2);
          }
        }
      });
    });
  };

  Game.prototype.step = function() {
    this.move();
    this.checkCollisions();
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Bullet) {
      bulIdx = this.bullets.indexOf(obj);
      if (bulIdx === 0)
        this.bullets.shift();
        else
          this.bullets.splice(bulIdx, bulIdx);



    } else {
      astIdx = this.asteroids.indexOf(obj)
      if(astIdx === 0){
        this.asteroids.shift();
      } else {
        this.asteroids.splice(astIdx, astIdx);
      }
      this.addBabyAsteroids(obj.pos);
      $("div#candy-count").empty();
      $("div#candy-count").append("<strong>Candies on screen: " + this.asteroids.length + "</strong>");
      $("div#candy-count").append("<strong>Candies to win: " + (100 - this.asteroids.length) + "</strong>");
      if(this.asteroids.length > 100){
        clearInterval(loop);
        $("a.restart").removeClass("hidden");
      }
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
  };
})();
