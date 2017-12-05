import { Action, PayloadAction, ErrorAction } from './models';

export class BaseAction<T> implements Action<T> {
  readonly type: T;
}

export class BasePayloadAction<T, P> implements PayloadAction<T, P> {
  readonly type: T;
  constructor(readonly payload: P) {};
}

export class BaseErrorAction<T, E, P> implements ErrorAction<T, E, P> {
  readonly type: T;
  constructor(
    readonly error: E,
    readonly payload: P
  ) {};
}
