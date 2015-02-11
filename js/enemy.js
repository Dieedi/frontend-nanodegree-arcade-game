/*
 *   Enemy generator and controler
 */

// declaring counter for 3 first enemies
var count = 0;

// Enemies our player must avoid
var Enemy = function(first) {
    /*
     *  Variables applied to each of our instances go here,
     *  we've provided one for you to get started
     *
     *  The image/sprite for our enemies, this uses
     *  a helper we've provided to easily load images
     */
    this.sprite = 'images/enemy-bug.png';

    /*
     *  Y location should be random and stick to each stone-block row.
     *  Current rows is 3, 83px between each row
     *  First bugs should be at least one on each row
     */
    if (first && count < 4) {
        count++;
        if (count <= 2) {
            this.y = (count * 83) - 15;
        }
        if (count > 2) {
            this.y = ((count + 1) * 83) - 15;
        }
        this.x = randomize(400);
    } else {
        /*
            randomly add enemies
        */
        var randRow = randomize(100);
        if (randRow <= 20) {
            this.y = 68;
        }
        if (randRow > 20 && randRow <= 50) {
            this.y = 151;
        }
        if (randRow > 50 && randRow <= 75) {
            this.y = 317;
        }
        if (randRow > 75) {
            this.y = 400;
        }


        // bugs' starting point behind the scene ! After first 3 was placed
        this.x = -100;
    }

    // randomize speed of bugs between 50 (slow) and 80 (fast)
    this.speed = randomize(80, 40);
    this.newEnemy = 0;
    this.touch = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // create/update box for enemies
    this.top = this.y;
    this.bottom = this.y + 70;
    this.right = this.x + 80;
    this.left = this.x;

    // check for enemies position to create new
    // only if it doesn't already launch one !
    if (this.x > 400 && this.newEnemy == 0) {
            // don't generate too much enemy by row
            createEnemies(randomize(1));
            this.newEnemy = 1;
    }

    // remove enemies if out of screen
    if (this.x > canvasSize.width) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Place all enemy objects in an array called allEnemies
// allEnemies should accept any new occurences .push(variables)
var allEnemies = [];

// should random enemies number, y location, speed ...
// Math.floor => round numbers
// Math.random() => gives a number between 0 and 1
function createEnemies (multi, add, first) {
    // create
    // if their is only one parameter
    if (!add) {
        add = 0;
    }
    var rand = randomize(multi, add);
    for (var i = 0; i <= rand; i++) {
        var enemy = new Enemy(first);
        allEnemies.push(enemy);
    }
}