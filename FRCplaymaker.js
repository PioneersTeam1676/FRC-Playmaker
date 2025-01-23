const canvas = document.getElementById('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');
const toggleDrawButton = document.getElementById('paintbrush-img');

let drawing = false;

// Toggle drawing mode
toggleDrawButton.addEventListener('click', () => {
    drawing = !drawing; // Toggle the drawing state
    console.log(clicked);
    //toggleDrawButton.textContent = drawing ? 'Stop Drawing' : 'Start Drawing'; // Update button text
});

// Draw on the canvas
canvas.addEventListener('mousedown', (e) => {
    if (drawing) {
        ctx.beginPath(); // Start a new path
        ctx.moveTo(e.offsetX, e.offsetY); // Move to the mouse position
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing && e.buttons === 1) { // Check if the left mouse button is pressed
        ctx.lineTo(e.offsetX, e.offsetY); // Draw a line to the current mouse position
        ctx.stroke(); // Render the line
    }
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    if (drawing) {
        ctx.closePath(); // Close the current path
    }
});

// // Stop drawing when the mouse leaves the canvas
// canvas.addEventListener('mouseleave', () => {
//     if (drawing) {
//         ctx.closePath(); // Close the current path
//     }
// });

// Optional: Set stroke style
ctx.strokeStyle = 'black'; // Set the color of the stroke
ctx.lineWidth = 2; // Set the width of the stroke
