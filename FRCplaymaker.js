const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const toggleDrawButton = document.getElementById('toggleDraw');

let drawing = false;
let isMouseDown = false;

// Toggle drawing mode
toggleDrawButton.addEventListener('click', () => {
    drawing = !drawing; // Toggle the drawing state
});

// Draw on the canvas
canvas.addEventListener('mousedown', (mouse) => {
    if (drawing) {
        isMouseDown = true;
        ctx.beginPath(); // Start a new path
        ctx.moveTo(mouse.offsetX, mouse.offsetY); // Move to the mouse position
    }
});

canvas.addEventListener('mousemove', (mouse) => {
    if (drawing && isMouseDown) { // Check if drawing mode is active and the mouse is down
        ctx.lineTo(mouse.offsetX, mouse.offsetY); // Draw a line to the current mouse position
        ctx.stroke(); // Render the line
    }
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    if (drawing) {
        isMouseDown = false;
        ctx.closePath(); // Close the current path
    }
});

// Stop drawing when the mouse leaves the canvas
canvas.addEventListener('mouseleave', () => {
    if (drawing && isMouseDown) {
        isMouseDown = false;
        ctx.closePath(); // Close the current path
    }
});

ctx.strokeStyle = 'black'; // Set the color of the stroke
ctx.lineWidth = 2; // Set the width of the stroke
