// Variables declarations
let yEnemies = [60, 140, 220, 140, 60, 210];

// Enemies our player must avoid
const Enemy = function(x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // new
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //  You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    let i;
        if (this.x < 505) {
            // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            this.x += dt * 15 * this.speed * Math.random();
        } else {
            i = Math.random() * yEnemies.length | 0 + 0;

            this.y = yEnemies[i];
            this.x = -100;
        }
    // check for collisions
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function (x, y){
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
}
// This class requires an update(), render() and
// a handleInput() method.
// Add updade() method to Player constructor fn.
Player.prototype.update = function(dt) {
    //Return the player back once they hit water: With delay
    if (this.y < 0) {
        this.pauseKey = true; //stop keyboard
        //this makes sure player does not dance randomly
        setTimeout(() => {
            this.pauseKey = false;
        }, 1200);
        //this is the actual functionality
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 600);
}};

// Add render() method to Player constructor fn.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Add handleInput() method to Player constructor fn.
Player.prototype.handleInput = function(key) {
     if (key === 'left' && this.x > 0) {
            this.x -= 100;
        } else if (key === 'right' && this.x < 400) {
            this.x += 100;
        } else if (key === 'up') {
            this.y -= 80;
        } else if (key === 'down' && this.y < 380) {
            this.y += 80;
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(-100, 60, 20, this.sprite);
let enemy2 = new Enemy(-100, 220, 40, this.sprite);
let enemy3 = new Enemy(-100, 140, 10, this.sprite);
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player(200, 400);

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
