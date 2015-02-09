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

        // check for collision with water
        if (player.top <= 60) {
            var message = "Congratulation !";
            player.reset(message);
        }
    };

    // replace player to starting point
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
        if (this.top + 83 <= 400) {
            this.top = this.top + (83);
        }
    } else if (key === "right") {
        if (this.left + 83 <= 402) {
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
