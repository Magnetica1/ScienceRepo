const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//ctx = shortcut for context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numebrofParticles = 500;
let hue = 0;


//mesure title element
let titleElement = document.getElementById('title1');
let titleMesurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMesurements.left,
    y: titleMesurements.top,
    width: titleMesurements.width,
    height: 10
}
class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 1;
        this.weight = Math.random() * 0.1 + 0.1;
        this.directionX = -3;
    } 
    update(){
        if (this.y > canvas.height) {
        this.y = 0 - this.size;
        this.weight = Math.random() * 0.1 + 0.1;
        this.x = Math.random() * canvas.width * 1.3;
    }
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;

        if(
            this.x < title.x + title.width &&
            this.x +this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
this.y -= 3;
this.weight *= -0.8;
        }
    }
    draw(){
        ctx.fillStyle = "hsl("+ hue +", 100%, 50%)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
function init(){
    particlesArray = [];
    for(let i = 0; i < numebrofParticles; i++){
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle (x, y));
}
}
init();


function animate(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update()
    particlesArray[i].draw();
    hue+=0.002;
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMesurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMesurements.left,
        y: titleMesurements.top,
        width: titleMesurements.width,
        height: 10
    }
    init();
})