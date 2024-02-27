export default abstract class GameScreen {
    abstract update(dt: number): void;
    abstract draw(): void;
}
