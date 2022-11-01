class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    static fromAngle(angle, magnitude) {
        return new Vector(
            magnitude * Math.cos(angle),
            magnitude * Math.sin(angle)
        );
    }
}

class Particle {
    constructor(position, velocity, acceleration) {
        this.position = position || new Vector();
        this.velocity = velocity || new Vector();
        this.acceleration = acceleration || new Vector();
    }

    move() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }
}

class App {
    constructor() {
        this.cnv = document.getElementById("cnv");
        this.ctx = this.cnv.getContext("2d");
        this.particles = [];
        this.size = 5;
        this.mouse = {
            x: this.cnv.width / 2,
            y: this.cnv.height / 2,
        };

        this.cnv.width = window.innerWidth;
        this.cnv.height = window.innerHeight;

        this.loop = this.loop.bind(this);

        this.init();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const currentParticle = this.particles[i];

            const vect = new Vector(
                this.mouse.x - currentParticle.position.x,
                this.mouse.y - currentParticle.position.y
            );
            const angle = vect.getAngle();

            currentParticle.acceleration = Vector.fromAngle(angle, 1);
            currentParticle.velocity.x *= 0.99;
            currentParticle.velocity.y *= 0.99;
            currentParticle.move();

            if (
                (currentParticle.position.x + this.size / 2 >= this.cnv.width &&
                    currentParticle.velocity.x > 0) ||
                (currentParticle.position.x - this.size / 2 < 0 &&
                    currentParticle.velocity.x < 0)
            ) {
                currentParticle.velocity.x *= -1;
            }
            if (
                (currentParticle.position.y + this.size / 2 >=
                    this.cnv.height &&
                    currentParticle.velocity.y > 0) ||
                (currentParticle.position.y - this.size / 2 < 0 &&
                    currentParticle.velocity.y < 0)
            ) {
                currentParticle.velocity.y *= -1;
            }
        }
    }

    draw() {
        this.ctx.fillStyle = "#fff";

        for (let i = 0; i < this.particles.length; i++) {
            const currentParticle = this.particles[i];

            this.ctx.beginPath();
            this.ctx.arc(
                currentParticle.position.x,
                currentParticle.position.y,
                this.size / 2,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }
    }

    addParticle(position) {
        this.particles.push(
            new Particle(
                position,
                new Vector(Math.random() * 10 - 5, Math.random() * 10 - 5),
                new Vector()
            )
        );
    }

    loop() {
        this.clear();
        this.update();
        this.draw();
        requestAnimationFrame(this.loop);
    }

    init() {
        for (let i = 0; i < 500; i++) {
            this.addParticle(
                new Vector(
                    this.cnv.width * Math.random(),
                    this.cnv.height * Math.random()
                )
            );
        }

        this.cnv.onclick = () => {
            this.addParticle(new Vector(this.mouse.x, this.mouse.y));
        };

        this.cnv.onmousemove = ({ offsetX, offsetY }) => {
            this.mouse.x = offsetX;
            this.mouse.y = offsetY;
        };

        this.loop();
    }
}

new App();
