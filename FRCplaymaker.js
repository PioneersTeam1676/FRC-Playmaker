const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 
const toggleDrawButton = document.getElementById('paintbrush-img-container'); 
const clearButton = document.getElementById('clearCanvas'); 
const eraseButton = document.getElementById('toggleErase'); 

let drawing = false; 
let isMouseDown = false;
let erasing = false;

// Match canvas dimensions to CSS dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Toggle drawing mode
toggleDrawButton.addEventListener('click', () => {
    drawing = !drawing; 
});

// Draw on the canvas
canvas.addEventListener('mousedown', (mouse) => {
    if (drawing) {
        isMouseDown = true;
        ctx.beginPath(); 
        ctx.moveTo(mouse.offsetX, mouse.offsetY); 
    }
    // if (erasing) {
    //     isMouseDown = true;
    //     ctx.clearRect(mouse.offsetX, mouse.offsetY, 10, 10); // Erase a small square at the mouse position
    // }
});

// Draws the line
canvas.addEventListener('mousemove', (mouse) => {
    if (drawing && isMouseDown) { 
        ctx.lineTo(mouse.offsetX, mouse.offsetY); 
        ctx.stroke(); 
    }
    // if (erasing && isMouseDown) {
    //     ctx.clearRect(mouse.offsetX, mouse.offsetY, 10, 10); // Erase a small square at the current mouse position
    // }
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    if (drawing) {
        isMouseDown = false;
        ctx.closePath(); 
    }
    // if (erasing) {
    //     isMouseDown = false;
    // }
});

// Stop drawing when the mouse leaves the canvas
canvas.addEventListener('mouseleave', () => {
    if (drawing && isMouseDown) {
        isMouseDown = false;
        ctx.closePath(); 
    }
    // if (erasing && isMouseDown) {
    //     isMouseDown = false;
    // }
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

ctx.strokeStyle = 'black'; // Set the color of the stroke
ctx.lineWidth = 2; // Set the width of the stroke
