import useCanvas from './useCanvas';
import {iParticle, moveParticle} from '../modules/particle';
import {iVector, getAngle, getVectorFromAngle} from '../modules/vector';

const useApp = () => {
    const { canvas, context } = useCanvas();

    const particles: iParticle[] = [];

    let mouse: iVector = [canvas.width / 2, canvas.height / 2];

    const size = 5;

    const addParticle = (position: iVector) => {
        particles.push({
            position,
            velocity: [Math.random() * 10 - 5, Math.random() * 10 - 5],
            acceleration: [0, 0],
        });
    }

    const clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const update = () => {
        particles.forEach((particle) => {
            const [mouseX, mouseY] = mouse;

            const angle = getAngle([
                mouseX - particle.position[0],
                mouseY - particle.position[1]
            ]);

            particle.acceleration = getVectorFromAngle(angle, 1);
            particle.velocity = [particle.velocity[0] * 0.99, particle.velocity[1] * 0.99];
            moveParticle(particle);

            if (
                (particle.position[0] + size / 2 >= canvas.width &&
                    particle.velocity[0] > 0) ||
                (particle.position[0] - size / 2 < 0 &&
                    particle.velocity[0] < 0)
            ) {
                particle.velocity[0] *= -1;
            }
            if (
                (particle.position[1] + size / 2 >=
                    canvas.height &&
                    particle.velocity[1] > 0) ||
                (particle.position[1] - size / 2 < 0 &&
                    particle.velocity[1] < 0)
            ) {
                particle.velocity[1] *= -1;
            }
        })
    };

    const draw = () => {
        context.fillStyle = '#fff';

        particles.forEach((particle) => {
            context.beginPath();
            context.arc(
                particle.position[0],
                particle.position[1],
                size / 2,
                0,
                Math.PI * 2
            );
            context.fill();
        })
    };

    const loop = () => {
        clear();
        update();
        draw();
        requestAnimationFrame(loop);
    };

    const init = () => {
        for (let i = 0; i < 100; i++) {
            addParticle([
                canvas.width * Math.random(),
                canvas.height * Math.random(),
            ])
        }

        loop();
    };

    return {
        init,
    }
};

export default useApp;
