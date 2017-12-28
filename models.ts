// Action Instance Interfaces
export interface Action<T> {
  readonly type: T;
}

export interface PayloadAction<T, P> {
  readonly type: T;
  readonly payload: P;
}

export interface ErrorAction<T, E, P = undefined> {
  readonly type: T;
  readonly error: E;
  readonly payload: P;
}

// Action Definition Interfaces
export interface ActionConstructable<T> {
  new(): Action<T>;
}

export interface ErrorConstructable<T, E, P> {
  new(error: E, payload: P): ErrorAction<T, E, P>;
}