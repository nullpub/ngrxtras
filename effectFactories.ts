import { Observable } from 'rxjs/Observable';

import {
  Action,
  PayloadAction,
  ErrorAction,
  ActionConstructable,
  ErrorConstructable
} from './models';
import { BaseErrorAction, BasePayloadAction } from './actions';


export function cancellableEffectFactory<OT, ST, ET, P, E>(
  obs: Observable<Action<any>>,
  action: string,
  func: (payload: P) => Observable<>,
  cancels: string[],
  success: PayloadAction<S>,
  failure: FailureConstructable<P>
) {
  return obs
      .filter(a => a.type === action)
      .map(a => a.payload)
      .switchMap(p => func(p)
          .takeUntil(obs.filter(a => cancels.some(c => c === a.type)))
          .map(s => new success(s))
          .catch(e => of(new failure(p, e))));
}