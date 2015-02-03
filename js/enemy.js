// Enemies our player must avoid
var Enemy = function(ref) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Y location should be random and stick to each stone row.
    // Current rows is 3, 83px between each row
    // random number should be between 68, 151 and 234
    // so rand between 1 and 3 by 83px - 15px
    this.y = (randomize(3, 1) * 83) - 15;

    // bugs' starting point behind the scene !... or not.
    this.locX = -100;

    var num = ref++;
    this.name = "enemy" + num;

    // randomize speed of bugs between 50 (slow) and 100 (fast)
    this.speed = randomize(50, 50);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.locX = this.locX + this.speed * dt;
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
createEnemies();

function createEnemies () {
    // create
    var rand = randomize(4);
    for (var i = 0; i <= rand; i++) {
        var enemy = new Enemy(i);
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