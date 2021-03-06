
/*jslint node: true */
/*jshint strict:false */
/* jshint -W097 */
/* jshint node: true */
"use strict";
// Variables declarations
let verticalEnemyPos = [60, 140, 220, 140, 60, 210];

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
            i = Math.random() * verticalEnemyPos.length | 0 + 0;

            this.y = verticalEnemyPos[i];
            this.x = -100;
        }
    // check for collisions
     if (Math.abs(this.x - player.x) < 75 &&
        Math.abs(this.y - player.y) < 78) {
        player.x = 202;
        player.y = 405;
        player.livesCount();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function (x, y, lives, scores){
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.scores = scores;
};

// This class requires an update(), render() and
// a handleInput() method.
// Add updade() method to Player constructor fn.
Player.prototype.update = function(dt) {
    //Player should stays in canvas
    if (this.x <= 2) this.x = 2;
    if (this.x >= 400) this.x = 400;
    //Player go back when she reach the water
    if (this.y < 0) {
        this.pauseKey = true; //stop keyboard
        //the functionality
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 600);
    if (this.y >= 400 || this.y <= -60) {
        this.y = 405;
        this.scores += 10;
    }

        // update the scores
        points.innerHTML = player.scores;

    // open the winning modal window
    if (points.textContent === '50'){
        winMode();
        allEnemies.forEach(function(enemy) {
            enemy.speed = 0;
        });
    }
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

// Remove hearts after the collision occurs
Player.prototype.livesCount = function () {
    let hearts = document.getElementsByTagName('ul')[0];
    hearts.removeChild(hearts.children[0]);

    this.lives -= 1;
    // open the losing modal window
    if (this.lives === 0){
        loseMode();
        allEnemies.forEach(function(enemy) {
            enemy.speed = 0;
        });
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(-100, 60, 10, this.sprite);
let enemy2 = new Enemy(-100, 220, 20, this.sprite);
let enemy3 = new Enemy(-100, 140, 5, this.sprite);
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player(200, 400, 3, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// add scores and lives

// create the 'scores' div
const body = document.getElementsByTagName('body');
const myScores = document.createElement('div');
myScores.setAttribute('class','theScores');
document.body.appendChild(myScores);

// create the title h3
const titleScores = document.createElement('h3');
titleScores.textContent = 'Scores: ';
titleScores.setAttribute('class', 'title-scores');
titleScores.setAttribute('style', 'display: inline-block; margin: 0 auto;');
myScores.appendChild(titleScores);

// create the points
const points = document.createElement('h3');
points.setAttribute('id', 'points');
points.setAttribute('style', 'display: inline-block; margin: 0');
points.textContent = '0';
myScores.appendChild(points);

// create the "lives" container
const lives = document.createElement('div');
lives.setAttribute('class', 'lives');
document.body.appendChild(lives);

// create the 'lives' title
const titleLives = document.createElement('h3');
titleLives.textContent = 'Lives: ';
titleLives.setAttribute('class', 'title-lives');
titleLives.setAttribute('style', 'display: inline-block; margin: 0;');
lives.appendChild(titleLives);

// the result measurment - starts with 3 hearts
const heartsUl = document.createElement('ul');
heartsUl.setAttribute('style', 'list-style-type: none; display: inline-block; margin: 0; padding: 0');
lives.appendChild(heartsUl);

const heart1 = document.createElement('li');
heart1.setAttribute('class', 'heart');
heart1.setAttribute('style', 'background: url(images/Heart.png); width: 30px; height: 40px; background-repeat: no-repeat; display: inline-block');

heartsUl.appendChild(heart1);

const heart2 = document.createElement('li');
heart2.setAttribute('class', 'heart');
heart2.setAttribute('style', 'background: url(images/Heart.png); width: 30px; height: 40px; background-repeat: no-repeat; display: inline-block');
heartsUl.appendChild(heart2);

const heart3 = document.createElement('li');
heart3.setAttribute('class', 'heart');
heart3.setAttribute('style', 'background: url(images/Heart.png); width: 30px; height: 40px; background-repeat: no-repeat; display: inline-block');
heartsUl.appendChild(heart3);

// Modal functionality

    const win = document.getElementById('WinMode');
    const lose = document.getElementById('LoseMode');
    // make the rest of the content dark
    const darkenContent = document.getElementById('page-mask');
function winMode() {
    win.setAttribute('style', 'display: block');
    win.focus();
    darkenContent.style.display = 'block';
}

function loseMode() {
    lose.setAttribute('style', 'display: block');
    lose.focus();
    titleLives.textContent = 'Lives: 0';
    darkenContent.style.display = 'block';
}

document.getElementById('click1').addEventListener('click', modalClick);

document.getElementById('click2').addEventListener('click', modalClick);

//Start new game on button click
function modalClick() {
    this.style.display = 'none';
    location.reload();
}