const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];


class Particle{
    constructor(moveRadius, step, positon, size) {
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = positon;
        this.size = size;
    }   
    draw(){
        ctx.beginPath();
        ctx.arc(Math.cos(this.position)* this.moveRadius + canvas.width/2,
        Math.sin(this.position) * this.moveRadius + canvas.height/2,
        this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
    update(){
        this.position += this.step;
        this.draw();
    }
}
 
function init(){
    particlesArray = [];
    for(let i = 0; i < 750; i++){
        let moveRadius = Math.random()*canvas.width;
        let step = (Math.random()*0.002) + 0.002;
        let position = Math.random()*(Math.PI*2);
        let size = (Math.random() * 15) + 5;

        particlesArray.push(new Particle(moveRadius, step, position, size));
        }
}
 
function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
}
init();
animate();

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}
)