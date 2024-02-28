import { Game } from "../main";
import IGameScreen from "../screens";

export class ScreenManager {
  private currentScreen: IGameScreen;
  private nextScreen: IGameScreen | null = null;
  private transitionProgress: number = 0;
  private transitionSpeed: number = 0.002; // Adjust the speed as needed

  constructor(initialScreen: IGameScreen) {
    this.currentScreen = initialScreen;
  }

  update(deltaTime: number): void {
    if (!this.currentScreen) return;
    if (this.nextScreen) {
      this.transitionProgress += this.transitionSpeed * deltaTime;
      if (this.transitionProgress >= 1) {
        this.currentScreen = this.nextScreen;
        this.nextScreen = null;
      }
    } else if (this.transitionProgress > 0) {
      this.transitionProgress -= this.transitionSpeed * deltaTime;
    } else if (this.transitionProgress < 0) this.transitionProgress = 0;

    this.currentScreen.update(deltaTime);
  }

  draw(): void {
    if (!this.currentScreen) {
      // const gradient = Game.ctx.createLinearGradient(0, 0, Game.canvas.width, Game.canvas.height);
      Game.ctx.fillStyle = "#666";
      Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
      Game.ctx.fillStyle = "#fff";
      Game.ctx.textAlign = "center";
      Game.ctx.font = "32px sans-serif";
      Game.ctx.fillText("NO SCREEN... :(", Game.canvas.width / 2, (Game.canvas.height / 2) + 16);
    }
    this.currentScreen.draw();

    if (this.transitionProgress != 0) {
      this.drawTransitionOverlay(this.transitionProgress);
    }
  }

  setScreen(newScreen: IGameScreen): void {
    this.nextScreen = newScreen;
  }

  private drawTransitionOverlay(transitionProgress: number): void {
    Game.ctx.beginPath();
    Game.ctx.fillStyle = "#000";
    Game.ctx.moveTo(0, 0);
    Game.ctx.lineTo(Game.canvas.width * transitionProgress * 3, 0);
    Game.ctx.lineTo(0, Game.canvas.height * transitionProgress * 3);
    Game.ctx.fill();
  }
}
