var count = 0;
// Enemies our player must avoid
var Enemy = function(first) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Y location should be random and stick to each stone row.
    // Current rows is 3, 83px between each row
    // First bugs should be at least one on each row
    if (first && count < 3) {
        count++;
        this.y = (count * 83) - 15;
    } else {
        // random number should be between 68, 151 and 234
        // so rand between 1 and 3 by 83px - 15px
        this.y = (randomize(3, 1) * 83) - 15;
    }

    // bugs' starting point behind the scene !... or not.
    this.locX = -100;

    /*var num = ref++;
    this.name = "enemy" + num;*/

    // randomize speed of bugs between 50 (slow) and 100 (fast)
    this.speed = randomize(100, 50);
    this.newEnemy = 0;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.locX = this.locX + this.speed * dt;

    // check for enemies position to create new
    if (this.locX > 200) {
        if (this.newEnemy == 0) {
            createEnemies(randomize(1));
            this.newEnemy = 1;
        }
    }

    // remove enemies if out of screen
    if (this.locX > 600) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.y);
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

// Generate a random number with given values
function randomize (multi, add) {
    // if their is only one parameter
    if (!add) {
        add = 0;
    }
    var gen = Math.floor((Math.random() * multi) + add);
    return gen;
}