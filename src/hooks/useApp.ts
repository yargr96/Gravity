import useCanvas from './useCanvas';
import { iParticle, moveParticle } from '../modules/particle';
import { iVector, getAngle, getVectorFromAngle } from '../modules/vector';

interface iAppOptions {
    size?: number;
    speed?: number;
    color?: string;
    backgroundColor?: string;
}

const useApp = ({
    size = 5,
    speed = 1,
    color = '#fff',
    backgroundColor = '#000',
}: iAppOptions = {}) => {
    const { canvas, context } = useCanvas();

    const particles: iParticle[] = [];

    let mouse: iVector = [canvas.width / 2, canvas.height / 2];

    const addParticle = (position: iVector) => {
        particles.push({
            position,
            velocity: [Math.random() * 10 - 5, Math.random() * 10 - 5],
            acceleration: [0, 0],
        });
    }

    const clear = () => {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const update = () => {
        particles.forEach((particle) => {
            const angle = getAngle([
                mouse[0] - particle.position[0],
                mouse[1] - particle.position[1]
            ]);

            particle.acceleration = getVectorFromAngle(angle, speed);
            particle.velocity = [particle.velocity[0] * 0.99, particle.velocity[1] * 0.99];
            moveParticle(particle);

            const halfSize = size / 2;

            if (
                (particle.position[0] + halfSize >= canvas.width && particle.velocity[0] > 0)
                || (particle.position[0] - halfSize < 0 && particle.velocity[0] < 0)
            ) {
                particle.velocity[0] *= -1;
            }

            if (
                (particle.position[1] + halfSize >= canvas.height && particle.velocity[1] > 0) ||
                (particle.position[1] - halfSize < 0 && particle.velocity[1] < 0)
            ) {
                particle.velocity[1] *= -1;
            }
        })
    };

    const draw = () => {
        context.fillStyle = color;

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

        canvas.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) {
                addParticle(mouse);
            }
        })

        canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
            mouse = [offsetX, offsetY];
        })

        loop();
    };

    return {
        init,
    }
};

export default useApp;
