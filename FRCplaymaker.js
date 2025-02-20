const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toggleDrawButton = document.getElementById('paintbrush-img');
const clearButton = document.getElementById('clear-img');
const eraseButton = document.getElementById('eraser-img');
const lineWidthSlider = document.getElementById('line-width-slider');

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

// Toggle drawing mode
toggleDrawButton.addEventListener('click', () => {
    drawing = !drawing; // Toggle the drawing state
    erasing = false; // Won't draw and erase simultaneously
    console.log("draw clicked");
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
        ctx.arc(pos.x, pos.y, ctx.lineWidth / 2, 0, Math.PI * 2); // Draw a circle for the stroke
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }
    if (erasing) {
        isMouseDown = true;
        ctx.save(); // Save the current drawing state
        ctx.globalCompositeOperation = 'destination-out'; // Set the composite operation to erase
        ctx.lineWidth = lineWidthSlider.value * 3; // Set the line width to 2x larger for erasing
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ctx.lineWidth / 2, 0, Math.PI * 2); // Draw a circle for erasing (2x larger)
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.restore(); // Restore the drawing state
    }
});

// Draws the line
canvas.addEventListener('mousemove', (mouse) => {
    const pos = getMousePos(canvas, mouse);
    if (drawing && isMouseDown) { // Check if the left mouse button is pressed
        ctx.lineTo(pos.x, pos.y); // Draw a line to the current mouse position
        ctx.stroke(); // Render the line
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ctx.lineWidth / 2, 0, Math.PI * 2); // Draw a circle for the stroke
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }
    if (erasing && isMouseDown) {
        ctx.save(); // Save the current drawing state
        ctx.globalCompositeOperation = 'destination-out'; // Set the composite operation to erase
        ctx.lineWidth = lineWidthSlider.value * 3; // Set the line width to 2x larger for erasing
        ctx.lineTo(pos.x, pos.y); // Draw a line to the current mouse position
        ctx.stroke(); // Render the line
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ctx.lineWidth / 2, 0, Math.PI * 2); // Draw a circle for erasing (2x larger)
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.restore(); // Restore the drawing state
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
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
});

// Update line width based on slider value
lineWidthSlider.addEventListener('input', () => {
    ctx.lineWidth = lineWidthSlider.value;
});

ctx.strokeStyle = 'black'; 
ctx.lineWidth = lineWidthSlider.value;
