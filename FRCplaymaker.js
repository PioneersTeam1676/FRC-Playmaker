const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toggleDrawButton = document.getElementById('paintbrush-img');
const clearButton = document.getElementById('clearCanvas');
const eraseButton = document.getElementById('eraser-img');

let drawing = false;
let isMouseDown = false;
let erasing = false;

// Match canvas dimensions to CSS dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Toggle drawing mode
toggleDrawButton.addEventListener('click', () => {
    drawing = !drawing; // Toggle the drawing state
    erasing = false; // Won't draw and erase simultaneously
    console.log("draw clicked");
    //toggleDrawButton.textContent = drawing ? 'Stop Drawing' : 'Start Drawing'; // Update button text
});

// Toggle erasing mode
eraseButton.addEventListener('click', () => {
    erasing = !erasing; // Toggle the erasing state
    drawing = false; // Won't draw and erase simultaneously
    console.log("erase clicked");
})

// Draws on the canvas
canvas.addEventListener('mousedown', (mouse) => {
    if (drawing) {
        isMouseDown = true;
        ctx.beginPath(); // Start a new path
        ctx.moveTo(mouse.offsetX, mouse.offsetY); // Move to the mouse position
    }
    if (erasing) {
         isMouseDown = true;
         ctx.clearRect(mouse.offsetX, mouse.offsetY, 10, 10); // Erase a small square at the mouse position
    }
});

// Draws the line
canvas.addEventListener('mousemove', (mouse) => {
    if (drawing && isMouseDown) { // Check if the left mouse button is pressed
        ctx.lineTo(mouse.offsetX, mouse.offsetY); // Draw a line to the current mouse position
        ctx.stroke(); // Render the line
    }
    if (erasing && isMouseDown) {
         ctx.clearRect(mouse.offsetX, mouse.offsetY, 10, 10); // Erase a small square at the current mouse position
    }   
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
    if (drawing)
        ctx.closePath(); // Close the current path
});

// Stop drawing when the mouse leaves the canvas
canvas.addEventListener('mouseleave', () => {
    
    isMouseDown = false;
    if (drawing){
        ctx.closePath(); // Close the current path
    }
    
});

// Clears the canvas
// clearButton.addEventListener('click', () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); 
// });

// Toggle erase mode
// eraseButton.addEventListener('click', () => {
//     erasing = !erasing;
//     if (erasing) {
//         drawing = false; // Disable drawing mode when erasing mode is active
//     }
// });

// Optional: Set stroke style
ctx.strokeStyle = 'black'; // Set the color of the stroke
ctx.lineWidth = 2; // Set the width of the stroke
