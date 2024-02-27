export class Vector2D { constructor(public x: number, public y: number) { } }

export default abstract class Entity {
    private static nextId = 1;

    readonly id: number;
    readonly layer: number;
    public position: Vector2D;

    constructor(x: number, y: number, layer: number = 0) {
        this.id = Entity.nextId++;
        this.position = new Vector2D(x, y);
        this.layer = layer;
    }
}

export * from './Player';