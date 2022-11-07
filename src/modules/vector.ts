export type IVector = [number, number];

export const addVector = ([ax, ay]: IVector, [bx, by]: IVector): IVector => ([ax + bx, ay + by]);

export const getAngle = ([x, y]: IVector): number => Math.atan2(y, x);

export const getVectorFromAngle = (angle: number, magnitude: number): IVector => ([
    magnitude * Math.cos(angle),
    magnitude * Math.sin(angle),
]);
