export class Vector2D { constructor(public x: number, public y: number) { } }

export default interface IEntity {
    position: Vector2D;
    draw(): void;
    update?: (dt: number) => void;
}

export * from './Player';