export type iVector = [number, number];

export const addVector = ([ax, ay]: iVector, [bx, by]: iVector): iVector => ([ax + bx, ay + by]);

export const getAngle = ([x, y]: iVector): number => Math.atan2(y, x);

export const getVectorFromAngle = (angle: number, magnitude: number): iVector => ([
    magnitude * Math.cos(angle),
    magnitude * Math.sin(angle),
]);
