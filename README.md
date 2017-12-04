# ngrxtras
A collection of tools and idiomatic patterns that make ngrx life a little cleaner and a littler easier.

## Foreword
This package is not transpiled into javascript since it is intended to be a dev dependency. By not transpiling earlier you should be able to take advantage of the tree shaking done by the angular compiler.

### PayloadAction
This is just a typescript interface. The basic idea is to make actions much cleaner. Here is the idiomatic pattern for a collection of actions:

```ts
import { PayloadAction } from '@nll/ngrxtras';
import { SomeInterface, OtherInterface } from '$interfaces'; // I use angular paths, you should too!

// Define the action types
export enum MyTypes {
  ONE = 'ACTION_ONE',
  TWO = 'ACTION_TWO',
  THREE = 'ACTION_THREE',
}

export class OneAction extends PayloadAction<MyTypes.ONE, SomeInterface> {};
export class TwoAction extends PayloadAction<MyTypes.TWO, OtherInterface> {};
export class ThreeAction extends PayloadAction<MyTypes.THREE> {}; // No payload on this action

/**
 * These actions have the following forms:
 * class OneAction {
 *   public readonly type: MyTypes.ONE;
 *   constructor(public readonly payload: SomeInterface) {}
 * }
 * 
 * class TwoAction {
 *   public readonly type: MyTypes.TWO;
 *   constructor(public readonly payload: OtherInterface) {}
 * }
 * 
 * class ThreeAction {
 *   public readonly type: MyTypes.THREE;
 *   constructor(public readonly payload: undefined) {}
 * }
 */

// Then export the discriminated union!
export type MyActions = OneAction | TwoAction | ThreeAction;
```

Clearly, this is a much smaller footprint for actions. If you've been using ngrx properly this is all you'll have to do. Here is how you instantiate a new action:

```ts
import { OneAction, TwoAction } from '$store';

/**
 * Given the following interface definitions:
 * interface SomeInterface {
 *   stuff: string;
 *   things: number[];
 * }
 * 
 * interface OtherInterface {
 *   blah: string;
 * }
 */

// Creating new actions works the same as before!
const a = new OneAction({stuff: 'a', things: []});
const b = new TwoAction({blah: 'b'});
```

Lastly, some reducer code:

```ts
import { MyActions, MyTypes } from '$store';

// Type Narrowing in reducers also works the same as before!
function someReducer(action: MyActions) {
  switch (action.type) {
    case MyTypes.ONE:
      return console.log('Got one action', action.payload.stuff);
    case MyTypes.TWO:
      return console.log('Got one action', action.payload.blah);
    case MyTypes.THREE:
      return console.log('Got three action', action.payload);
    default:
      console.log('Got default');
  }
}
```

That's it for now!
