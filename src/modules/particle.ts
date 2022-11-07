import { IVector, addVector } from '@/modules/vector';

export interface IParticle {
    position: IVector;
    velocity: IVector;
    acceleration: IVector;
}

export const moveParticle = (particle: IParticle): void => {
    particle.position = addVector(particle.position, particle.velocity);
    particle.velocity = addVector(particle.velocity, particle.acceleration);
};
