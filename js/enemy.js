// Enemies our player must avoid
var Enemy = function(locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //this.x = locX * 50;
    this.y = locY * 50;
    this.locX = -100;
    var num = locY++;
    this.name = "enemy" + num;
    this.speed = 10;
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
var Enemy1 = new Enemy(1,1);
var allEnemies = [Enemy1];