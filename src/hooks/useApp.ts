import useCanvas from './useCanvas';

const useApp = () => {
    const { canvas, context } = useCanvas();

    const particles = [];
    const size = 5;
    const mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };

    const clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const update = () => {};

    const draw = () => {};

    const loop = () => {
        clear();
        update();
        draw();
        requestAnimationFrame(loop);
    };

    const addParticle = () => {};

    const init = () => {
        loop();
    };

    return {
        init,
    }
};

export default useApp;
