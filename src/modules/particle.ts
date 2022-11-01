import { iVector, addVector } from './vector';

export interface iParticle {
    position: iVector;
    velocity: iVector;
    acceleration: iVector;
}

export const moveParticle = (particle: iParticle): void => {
    particle.position = addVector(particle.position, particle.velocity);
    particle.velocity = addVector(particle.velocity, particle.acceleration);
}
