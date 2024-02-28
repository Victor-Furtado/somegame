import { Player, Vector2D } from "../entities";
import { Game } from "../main";
import { Bullet } from "./bullet";

type ItemType = "pistol";

export class PlayerItem {
    private player: Player;
    private item: HTMLImageElement;
    private angle: number = 0;
    private flipped: boolean = false;

    private bullets: Bullet[] = [];
    private coolDown: number = 20;
    private cdTimer: number = 0;

    constructor(player: Player, item: ItemType) {
        this.player = player;
        this.item = new Image;
        this.item.src = `/items/${item}.png`;
    }

    update() {
        const direction = new Vector2D(0, 0)

        if (Game.Keys["ArrowLeft"]) direction.x = -1;
        if (Game.Keys["ArrowRight"]) direction.x = 1;
        if (Game.Keys["ArrowUp"]) direction.y = -1;
        if (Game.Keys["ArrowDown"]) direction.y = 1;

        this.angle = Math.atan2(direction.y, Math.abs(direction.x));

        if (direction.x < 0 && !this.flipped) this.flipped = true;
        if (direction.x > 0 && this.flipped) this.flipped = false;

        for (const bullet of this.bullets) {
            bullet.update();
        }

        this.bullets = this.bullets.filter((bullet) => {
            const position = bullet.getPosition();
            return position.x >= 0 && position.x <= Game.canvas.width
                && position.y >= 0 && position.y <= Game.canvas.height;
        });

        if (Object.values(direction).some(a => a != 0) && this.cdTimer === 0)
            this.spawnBullet(10, direction, this.getWeaponPos());
        if (this.cdTimer > 0) this.cdTimer--;
    }

    draw() {
        const { x, y } = this.getWeaponPos();
        Game.ctx.save();
        Game.ctx.translate(x, y);
        if (this.flipped) Game.ctx.scale(-1, 1);
        Game.ctx.rotate(this.angle);

        const downrate = this.item.height / 20
        const imageW = this.item.width / downrate;
        Game.ctx.drawImage(this.item, 10, -5, imageW, 20);
        Game.ctx.restore();
    };

    drawBullets() {
        this.bullets.forEach(bullet => {
            Game.ctx.beginPath();
            Game.ctx.fillStyle = "#fff";
            const { x, y } = bullet.getPosition();
            Game.ctx.arc(x, y, 2, 0, 2 * Math.PI);
            Game.ctx.fill();
            Game.ctx.closePath();
        })
    }

    private spawnBullet(speed: number, direction: { x: number; y: number }, startPosition: { x: number; y: number }): void {
        const bullet = new Bullet(speed, direction, startPosition);
        this.bullets.push(bullet);
        this.cdTimer = this.coolDown;
    }

    private getWeaponPos() {
        const { x, y } = this.player.position;
        const { x: w, y: h } = this.player.sizes;
        return new Vector2D(x + w / 2, y + h / 4)
    }
}