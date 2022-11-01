const useCanvas = () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    document.body.append(canvas);

    const context: CanvasRenderingContext2D = canvas.getContext('2d');

    return {
        canvas,
        context,
    };
};

export default useCanvas;
