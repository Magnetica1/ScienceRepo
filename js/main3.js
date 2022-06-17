const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get Mouse Position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) *(canvas.width/80),
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}
);

//create Particles
class Particle{
constructor(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}
//method to draw the particle
draw(){
ctx.beginPath();
ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
ctx.fillStyle = "white";
ctx.fill();
}
//check Particle collision with mouse, move particle, draw particle
update(){
if(this.x > canvas.width || this.x < 0){
    this.directionX = -this.directionX; 
}
if(this.y > canvas.height || this.y < 0){
    this.directionY = -this.directionY;
}

let dx = mouse.x - this.x;
let dy = mouse.y - this.y;
let distance = Math.sqrt(dx * dx + dy * dy);

if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -=10;   
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size *10) {
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size *10) {
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

//create particle array 

function init() {
    particlesArray =[];
    let numberOfParticle = (canvas.height *canvas.width) / 7000;
    for (let i = 0; i < numberOfParticle; i++) {
let size = (Math.random() * 5 ) + 1;   
let x = (Math.random() * ((innerWidth -size * 2) - (size * 2)) + size * 2);
let y = (Math.random() * ((innerHeight -size * 2) - (size * 2)) + size * 2);
let directionY = (Math.random() * 2) - 0.01;
let directionX = (Math.random() * 2) - 0.01;
let color = "white";

particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}


function connect() {
    let opacityValue = 1;

    for (let a = 0; a < particlesArray.length; a++ ) {
    
    for (let b = a; b < particlesArray.length; b++) {
        let distance  = ((particlesArray[a].x - particlesArray[b].x) 
        * (particlesArray[a].x - particlesArray[b].x)) 
        + ((particlesArray[a].y - particlesArray[b].y) 
        * (particlesArray[a].y - particlesArray[b].y));
    
    if(distance < (canvas.height/7) *(canvas.width/7)) {
    
        opacityValue = 1 - (distance/9000);        
        ctx.strokeStyle = "rgba(225, 225, 225," + opacityValue +")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
}
}
}
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}
init(); 
animate();