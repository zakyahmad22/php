// Simple Snake Game

// Canvas setup
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

// Game variables
const gridSize = 20;
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;
let snake, food, direction, newDirection, gameOver;

// Function to initialize the game
function initGame() {
        snake = [{ x: 10, y: 10 }];
        food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        };
        direction = { x: 1, y: 0 };
        newDirection = { x: 1, y: 0 };
        gameOver = false;
        }

// Draw a rectangle
function drawRect(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
        }

        // Draw wall (border)
        function drawWalls() {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        }

        // Draw Game Over message
        function drawGameOver() {
        ctx.fillStyle = "black";
        ctx.font = "24px Arial";
        ctx.fillText("Game Over! Press Enter to Restart", 50, canvas.height / 2);
        }

// Game loop
function update() {
        if (gameOver) return;

        // Update direction
        direction = newDirection;

        // Move snake
        const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
        };

        // Check for collisions with walls
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        gameOver = true;
        return;
        }

  // Check for collisions with itself
        for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
        gameOver = true;
        return;
        }
        }

        // Add new head to snake
        snake.unshift(head);

        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
        food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        };
        } else {
        // Remove tail
        snake.pop();
        }
}

function draw() {
  // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw walls
        drawWalls();

  // Draw food
        drawRect(food.x, food.y, "red");

  // Draw snake
        for (let segment of snake) {
        drawRect(segment.x, segment.y, "green");
        }

  // If game is over, draw the Game Over message
        if (gameOver) {
        drawGameOver();
        }
}

function gameLoop() {
        update();
        draw();
        if (!gameOver) {
        setTimeout(gameLoop, 150); // Adjust speed here
        }
}

document.addEventListener("keydown", (e) => {
        if (gameOver && e.key === "Enter") {
    // Restart the game if Enter is pressed after Game Over
        initGame();
        gameLoop();
        return;
        }

  // Change direction based on key press
        switch (e.key) {
        case "ArrowUp":
        if (direction.y === 0) newDirection = { x: 0, y: -1 };
        break;
        case "ArrowDown":
        if (direction.y === 0) newDirection = { x: 0, y: 1 };
        break;
        case "ArrowLeft":
        if (direction.x === 0) newDirection = { x: -1, y: 0 };
        break;
        case "ArrowRight":
        if (direction.x === 0) newDirection = { x: 1, y: 0 };
        break;
        }
});

// Initialize and start the game
initGame();
gameLoop();
