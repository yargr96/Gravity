import useCanvas from './useCanvas';

const useApp = () => {
    const { canvas, context } = useCanvas();

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

    const init = () => {
        loop();
    };

    return {
        init,
    }
};

export default useApp;
