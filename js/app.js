// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // adding image for player char
    this.sprite = 'images/char-boy.png';
    // placing player
    this.left = 200;
    this.top = 400;

    // check for collisions
    this.checkCollisions = function() {
        // check for collision with enemies using objects boxes
        allEnemies.forEach(function(enemy) {
            if (player.top <= enemy.bottom && player.bottom >= enemy.top && player.right >= enemy.left && player.left <= enemy.right) {
                var message = "Ooooh, that's so sad :(";
                player.reset(message);
            }
        });

        // check for collision with top stone block
        if (player.top <= 60 && ((player.left + 2) == CanvasObjects.startStoneX)) {
            var message = "Congratulation !";
            player.reset(message);
        }

        // check for collision with water
        else if (player.top <= 60) {
            var message = "You don't know how to swim...";
            player.reset(message);
        }
    };

    // replace player to starting point / trigger message
    this.reset = function(message) {
        player.left = 200;
        player.top = 400;
        alert(message);
    };
}

Player.prototype.handleInput = function(key) {
    // check the key and location to move player
    if (key === "up") {
        if (this.top - 83 >= -15) {
            this.top = this.top - (83);
        }
    } else if (key === "down") {
        if (this.top + 83 <= Canvas.height - 181) {
            this.top = this.top + (83);
        }
    } else if (key === "right") {
        if (this.left + 83 <= Canvas.width - 103) {
            this.left = this.left + (101);
        }
    } else {
        if (this.left - 83 >= -2) {
            this.left = this.left - (101);
        }
    }

    // create/update box for player
    this.top = this.top;
    this.bottom = this.top + 80;
    this.right = this.left + 60;
    this.left = this.left;

    // debugging
    console.log(this.left, this.top);
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.left, this.top);
}

// Now instantiate your objects.
// Place the player object in a variable called player
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Generate a random rounded number with given values
function randomize (multi, add) {
    // if their is only one parameter
    if (!add) {
        add = 0;
    }
    var gen = Math.floor((Math.random() * multi) + add);
    return gen;
}

/*
    World building
*/

var canvasSize = function() {
    this.col = 8;
    this.row = 6;
    this.width = this.col * 101;
    this.height = this.row * 101;
}

var Canvas = new canvasSize;

var canvasObjects = function() {
    this.stone = 'images/stone-block.png';
    this.water = 'images/water-block.png';
    this.grass = 'images/grass-block.png';
    this.startStoneX = randomize(Canvas.col) * 101;
};

canvasObjects.prototype.render = function() {
    ctx.drawImage(Resources.get(this.stone), this.startStoneX, 0);
}

var CanvasObjects = new canvasObjects;