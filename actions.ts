export class Action<T> {
  public readonly type: T;
  readonly isError = false;
}

export class PayloadAction<T, P = void> {
  public readonly type: T;
  readonly isError = false;
  constructor(public readonly payload: P) {};
}

export class ErrorAction<T, E = any, P = void> {
  readonly type: T;
  readonly isError = true;
  constructor(
    public readonly payload: P,
    public readonly error: E
  ) {};
}
