export default interface IGameScreen {
    update(dt: number): void;
    draw(): void;
}

export * from './Play';