export class PayloadAction<T, P = undefined> {
  public readonly type: T;
  constructor(public readonly payload: P) {};
}

export class ErrorAction<T, E = any, P = undefined> {
  readonly type: T;
  constructor(
    public readonly payload: P,
    public readonly error: E
  ) {};
}