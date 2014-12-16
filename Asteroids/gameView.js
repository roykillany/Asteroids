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
      ctx.drawImage(img, 200, 200);
    };
    img.src = './babyducks.gif';
    window.setInterval((function () {
      this.game.step();
      this.game.draw(ctx, img);
    }).bind(this), 1000 / 60);
    this.ship = this.game.ship;
    this.bindKeyHandlers();

  }

  GameView.prototype.bindKeyHandlers = function () {
    //make this actually support multikeys
    var ship = this.ship;
    key('left', function(){ ship.power([-1, 0]); });
    key('right', function(){ship.power([1, 0]); });
    key('up', function(){ship.power([0, -1]); });
    key('down', function(){ship.power([0, 1]); });

    key('space', function(){ship.fireBullet(); });
  }

})();
