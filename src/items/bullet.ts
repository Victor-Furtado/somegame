import { Vector2D } from "../entities";

export class Bullet {
    private speed: number;
    private direction: Vector2D;
    private position: Vector2D;

    constructor(speed: number, direction: Vector2D, startPosition: Vector2D) {
        this.speed = speed;
        this.direction = { x: direction.x, y: direction.y };
        this.position = { x: startPosition.x, y: startPosition.y };
    }

    update(): void {
        this.position.x += this.direction.x * this.speed;
        this.position.y += this.direction.y * this.speed;
    }

    getPosition(): Vector2D {
        return { x: this.position.x, y: this.position.y };
    }
}