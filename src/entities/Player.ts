import Entity, { Vector2D } from ".";
import { Game } from "../main";

export class Player extends Entity {
    private velocity!: Vector2D;
    public sizes!: Vector2D;
    private speed: number = 3;
    private jumping: boolean = false;
    private grounded: boolean = false;

    constructor(x: number, y: number) {
        super(x, y);
        this.velocity = new Vector2D(0, 0);
        this.sizes = new Vector2D(20, 50);
    }

    update(dt: number): void {
        this.grounded = this.position.y >= Game.canvas.height - this.sizes.y;
        if (Game.Keys["Space"]) {
            if (!this.jumping && this.grounded) {
                this.jumping = true;
                this.grounded = false;

                this.velocity.y = -this.speed * 2.5;//how high to jump
            }
        }

        if (Game.Keys["KeyD"]) {
            // right arrow
            if (this.velocity.x < this.speed) {
                this.velocity.x++;
            }
        }
        if (Game.Keys["KeyA"]) {
            // left arrow
            if (this.velocity.x > -this.speed) {
                this.velocity.x--;
            }
        }

        this.velocity.x *= 0.8;
        this.velocity.y += 0.4;

        if (this.grounded) {
            this.jumping = false;
            this.velocity.y = 0;
            this.position.y = Game.canvas.height - this.sizes.y
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(): void {
        const { x, y } = this.position;
        const { x: w, y: h } = this.sizes;
        Game.ctx.fillStyle = "#f66";
        Game.ctx.fillRect(x, y, w, h);
    }
}