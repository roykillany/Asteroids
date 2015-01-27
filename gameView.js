(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function () {
    this.game = new Asteroids.Game();
  };


  GameView.prototype.start = function(canvas) {
    ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = './colorful-candy-frame.jpg';
    loop = window.setInterval((function () {
      this.game.step();
      this.game.draw(ctx, img);
    }).bind(this), 1000 / 60);
    this.ship = this.game.ship;
    this.bindKeyHandlers();
  }

  GameView.prototype.stop = function(canvas){
    clearInterval(loop);
  }

  GameView.prototype.restart = function(canvas){
    this.game = new Asteroids.Game();
    this.start(canvas);
  }

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;
    key('left', function(){ ship.power([-1, 0]); });
    key('right', function(){ship.power([1, 0]); });
    key('up', function(){ship.power([0, -1]); });
    key('down', function(){ship.power([0, 1]); });
    key('space', function(){ship.fireBullet(); });
  }

})();
