export interface iVector {
    x: number;
    y: number;
}

export const add = (a: iVector, b: iVector): iVector => ({
    x: a.x + b.x,
    y: a.y + b.y
});

export const getMagnitude = (vector: iVector): number => Math.sqrt(vector.x ** 2 + vector.y ** 2);

export const getAngle = (vector: iVector): number => Math.atan2(vector.y, vector.x);

export const getVectorFromAngle = (angle: number, magnitude: number): iVector => ({
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle),
});
