// Potential factory function work..
import { Action, PayloadAction, ErrorAction } from './models';

export const action =
  <T>(type: T) =>
  (): Action<T> =>
  ({ type });

export const payloadAction =
  <T, P>(type: T) =>
  (payload: P): PayloadAction<T, P> =>
  ({ type, payload });

export const errorAction =
  <T, E, P = undefined>(type: T) =>
  (error: E, payload?: P): ErrorAction<T, E, P> =>
  ({ type, error, payload });
