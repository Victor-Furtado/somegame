import IGameScreen from ".";
import { Player } from "../entities";
import { Game } from "../main";

export class PlayScreen implements IGameScreen {
    private player: Player;
    constructor(){
        this.player = new Player(Game.canvas.width/2, 60);
    };
    
    update(dt: number): void {
        this.player.update(dt);
    }
    
    draw(): void {
        Game.ctx.fillStyle = "#66c";
        Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        this.player.draw();
    }
}