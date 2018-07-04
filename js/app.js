// Enemies our player must avoid
class Enemy {
    constructor(x, y, enemySpeed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images    
        this.sprite = "images/enemy-bug.png";
        this.x = x;
        this.y = y;
        this.enemySpeed = enemySpeed;

        //collision coords
        this.collisionTop = y + 78;
        this.collisionBottom = y + 143;
        this.collisionLeft = x + 1;
        this.collisionRight = x + 100;
    }

    // The update method for the Enemy 
    // Updates the Enemy location (you need to implement)

    // reset enemy's speed at new run
    enemyRebirth() {
        if (this.x >= 505) {

            //return to start at random speed
            this.x = -101;
            this.enemySpeed = Math.round(((Math.random() + 0.3) * 300));
        }
    }

    // Handles collision with the Player (you need to implement)
    collisionCheck() {
        if ((this.collisionBottom >= player.collisionTop) && (this.collisionTop <= player.collisionBottom)) {
            if ((this.collisionRight > player.collisionLeft) && (this.collisionLeft < player.collisionRight)) {
                console.log(`collision happened! 
                Enemy at ${this.collisionBottom}, ${this.collisionTop}, ${this.collisionLeft}, ${this.collisionRight} 
                and 
                Player at ${player.collisionBottom}, ${player.collisionTop}, ${player.collisionLeft}, ${player.collisionRight}`);

                function collisionConsequenses() {
                    player.x = 200;
                    player.y = 400;
                }

                collisionConsequenses();
            }
        }
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.enemySpeed;
        this.collisionLeft = this.x + 10;
        this.collisionRight = this.x + 70;
        this.enemyRebirth();
        this.collisionCheck();
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = "images/char-boy.png";

        //collision coords
        this.collisionTop = this.y + 63;
        this.collisionBottom = this.y + 140;
        this.collisionLeft = this.x + 18;
        this.collisionRight = this.x + 85;
    }

    // render method
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    // handlerInput (minX, minY, maxX, maxY are border limits)
    handleInput(allowedKeys, minX = -10, maxX = 500, minY = -15, maxY = 450) {
        // Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down

        // Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).

        // If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
        const moveX = 101,
            moveY = 83,
            waterlineY = 83;
        if (allowedKeys === "up") {
            (minY <= this.y - moveY) ?
            ((this.y > waterlineY) ? this.y -= moveY : this.y = 400) : this.y;
        } else if (allowedKeys === "down") {
            (this.y + moveY <= maxY) ? this.y += moveY: this.y;
        } else if (allowedKeys === "left") {
            (minX <= (this.x - moveX)) ? this.x -= moveX: this.x;
        } else if (allowedKeys === "right") {
            ((this.x + moveX) <= maxX) ? this.x += moveX: this.x;
        }
    }

    update(dt) {
        // call Player methods
        this.collisionTop = this.y + 63;
        this.collisionBottom = this.y + 140;
        this.collisionLeft = this.x + 18;
        this.collisionRight = this.x + 85;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200, 400),
    enemy1 = new Enemy(-100, 60, 50),
    enemy2 = new Enemy(-100, 145, 150),
    enemy3 = new Enemy(-100, 230, 250),
    enemy4 = new Enemy(-100, 310, 100),
    allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});