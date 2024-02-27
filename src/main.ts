import { ScreenManager } from "./core/ScreenManager";
import { PlayScreen } from "./screens";
import { GameScreen } from "./utils/interfaces";

export class Game {
  static canvas: HTMLCanvasElement;
  static ctx: CanvasRenderingContext2D;
  private lastTimestamp: number = 0;
  private screenManager: ScreenManager;

  static SetScreen: (screen: string) => void;
  static Screens: Record<string, GameScreen> = {};

  static Keys: Record<string, boolean> = {};

  constructor() {
    Game.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    Game.ctx = Game.canvas.getContext("2d")!;

    Game.Screens = {
      Play: new PlayScreen(),
    }

    this.screenManager = new ScreenManager(Game.Screens["Play"]);
    Game.SetScreen = (screen) => this.screenManager.setScreen(Game.Screens[screen]);

    this.update = this.update.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.addEventListener('keydown', this.handleKeyPress);
    window.addEventListener('keyup', this.handleKeyUp);

    requestAnimationFrame(this.update);
  }

  update(timestamp: number) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.screenManager.update(deltaTime);

    this.clearCanvas();
    this.screenManager.draw();

    this.lastTimestamp = timestamp;
    requestAnimationFrame(this.update);
  }

  clearCanvas() {
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    Game.ctx.textAlign = "left";
    Game.ctx.font = "12px sans-serif";
  }

  handleKeyPress(event: KeyboardEvent) {
    Game.Keys[event.code] = true;
  }

  handleKeyUp(event: KeyboardEvent) {
    Game.Keys[event.code] = false;
  }
}

// Initialize the game
new Game();