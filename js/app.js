// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // adding image for player char
    this.sprite = 'images/char-boy.png';
    // placing player
    this.x = 200;
    this.y = 400;
}

Player.prototype.handleInput = function(key) {
    if (key === "up") {
        if (this.y - 83 >= -15) {
            this.y = this.y - (83);
        }
    } else if (key === "down") {
        if (this.y + 83 <= 400) {
            this.y = this.y + (83);
        }
    } else if (key === "right") {
        if (this.x + 83 <= 402) {
            this.x = this.x + (101);
        }
    } else {
        if (this.x - 83 >= -2) {
            this.x = this.x - (101);
        }
    }
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
