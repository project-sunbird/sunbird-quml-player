export interface LifeCycle {
  onInit?(): void;
  onEntry?(): void;
  onExit?(): void;
}
