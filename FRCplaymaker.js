const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toggleDrawButton = document.getElementById('paintbrush-img');
const clearButton = document.getElementById('/clearCanvas');
const eraseButton = document.getElementById('eraser-img');

let drawing = false;
let isMouseDown = false;
let erasing = false;

// Match canvas dimensions to CSS dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Function to get the mouse position relative to the canvas
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) * (canvas.width / rect.width),
        y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
}

// Function to resize the canvas and adjust the drawing coordinates
function resizeCanvas() {
    const container = document.getElementById('frc-playmaker-container');
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.drawImage(tempCanvas, 0, 0);
}

// Initial canvas size
resizeCanvas();

// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas);

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
    const pos = getMousePos(canvas, mouse);
    if (drawing) {
        isMouseDown = true;
        ctx.beginPath(); // Start a new path
        ctx.moveTo(pos.x, pos.y); // Move to the mouse position
    }
    if (erasing) {
         isMouseDown = true;
         ctx.clearRect(pos.x, pos.y, 20, 20); // Erase a small square at the mouse position
    }
});

// Draws the line
canvas.addEventListener('mousemove', (mouse) => {
    const pos = getMousePos(canvas, mouse);
    if (drawing && isMouseDown) { // Check if the left mouse button is pressed
        ctx.lineTo(pos.x, pos.y); // Draw a line to the current mouse position
        ctx.stroke(); // Render the line
    }
    if (erasing && isMouseDown) {
         ctx.clearRect(pos.x, pos.y, 10, 10); // Erase a small square at the current mouse position
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

ctx.strokeStyle = 'black'; // Set the color of the stroke
ctx.lineWidth = 2; // Set the width of the stroke