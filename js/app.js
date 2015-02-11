// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // adding image for player char
    this.sprite = 'images/char-boy.png';
    // placing player
    this.left = 200;
    this.top = 566;

    /*
     *  Check for collisions
     *  Reset player position if needed
     */
    this.checkCollisions = function() {
        // check for collision with enemies using objects boxes
        allEnemies.forEach(function(enemy) {
            if (player.top <= enemy.bottom && player.bottom >= enemy.top && player.right >= enemy.left && player.left <= enemy.right) {
                var message = "Ooooh, that's so sad :(";
                player.reset(message);
            }
        });

        // check for collision with star
        if (player.top <= canvasObjects.starBottom && player.bottom >= canvasObjects.starTop && player.right >= canvasObjects.starLeft && player.left <= canvasObjects.starRight) {
            // Destroy all enemies by freeing array
            allEnemies = [];
            // Destroy the star by deleting x value property
            delete(canvasObjects.starTop);
            count = 0;
            // Create new enemies
            createEnemies(3, 2, 1);
        }

        // check for collision with top stone block
        if (player.top <= 60 && ((player.left + 2) == canvasObjects.startStoneX)) {
            var message = "Congratulation !";
            player.reset(message);
        }

        // check for collision with water
        else if (player.top <= 60) {
            var message = "You don't know how to swim...";
            player.reset(message);
        }
    };

    /*
     *  replace player to starting point and replace star by adding x value
     *  display message given by collision.
     */
    this.reset = function(message) {
        player.left = 200;
        player.top = 566;
        canvasObjects.starTop = (randomize((canvasSize.row - 2), 2) * 83) - 15;
        alert(message);
    };
}

Player.prototype.handleInput = function(key) {
    /*
     *  check the key and location to move player
     *  block player if he reach the edge of game box
     */
    if (key === "up") {
        if (this.top - 83 >= -15) {
            this.top = this.top - (83);
        }
    } else if (key === "down") {
        if (this.top + 83 <= canvasSize.height - 181) {
            this.top = this.top + (83);
        }
    } else if (key === "right") {
        if (this.left + 83 <= canvasSize.width - 103) {
            this.left = this.left + (101);
        }
    } else {
        if (this.left - 83 >= -2) {
            this.left = this.left - (101);
        }
    }

    // create/update box for player (needed to check collisions)
    this.top = this.top;
    this.bottom = this.top + 80;
    this.right = this.left + 60;
    this.left = this.left;

    // debugging
    // console.log(this.left, this.top);
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

/*
 *  Generate a random rounded number with given values
 *  Needed by most of functions
 */
function randomize (multi, add) {
    // if their is only one parameter
    if (!add) {
        add = 0;
    }
    //  round number by Math.floor
    var gen = Math.floor((Math.random() * multi) + add);
    return gen;
}

/*
 *  World building
 */

/*
 *  Extract of canvas properties from engine.js
 */
var CanvasSize = function() {
    // col and row are fixed sizes...
    this.col = 8;
    this.row = 8;
    this.width = this.col * 101;
    this.height = this.row * 101;
}

var canvasSize = new CanvasSize;

/*
 *  Objects to display
 */

var CanvasObjects = function() {
    this.stone = 'images/stone-block.png';
    this.water = 'images/water-block.png';
    this.grass = 'images/grass-block.png';
    this.princess = 'images/char-princess-girl.png';
    this.star = 'images/Star.png';
    this.starTop = (randomize((canvasSize.row - 2), 2) * 83) - 15;
    this.starLeft = randomize(canvasSize.col) * 101;
    this.startStoneX = randomize(canvasSize.col) * 101;
};

CanvasObjects.prototype.render = function() {
    // Draw the princess with resize to fit block
    ctx.drawImage(Resources.get(this.princess), (this.startStoneX + 5), 0, 91, 154);
    // Draw the star
    ctx.drawImage(Resources.get(this.star), this.starLeft, this.starTop)
}

var canvasObjects = new CanvasObjects;

CanvasObjects.prototype.update = function() {
    // create/update box for star
    this.starTop = this.starTop;
    this.starBottom = this.starTop + 70;
    this.starRight = this.starLeft + 70;
    this.starLeft = this.starLeft;
}