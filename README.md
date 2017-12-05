# ngrxtras
A collection of tools and idiomatic patterns that make ngrx life a little cleaner and a littler easier.

## Foreword
This package is not transpiled into javascript since it is intended to be a dev dependency. By not transpiling earlier you should be able to take advantage of the tree shaking done by the angular compiler.

## Actions
This library offers two ways of specifying and instantiating new actions, with factory functions or with class extentions. Both ways should work fine, but the factory functions end up being a little bit cleaner. Aside from the instantiation methods, there are three action patterns that are defined.

1. Standard Actions, which are object literals with only a ```type``` property.
2. Payload Actions, which are object literals with a ```type``` property and a ```payload``` property.
3. Error Actions, which are object literals with a ```type``` property, an ```error``` property, and an *optional* ```payload``` property (which is meant to be whatever payload lead to the error).

I've found that single parameter actions (which the exception of error actions) are much simpler to reason about. It also forces me to define interfaces for any action I may design, which helps teammembers understand what an action expects.

### Class Based Actions, PayloadActions, and ErrorActions
Following are some snippets on extending and instantiating the Action classes.

```ts
import { BaseAction, BasePayloadAction, BaseErrorAction } from '@nll/ngrxtras';
import { SomeInterface, OtherInterface, ErrorInterface } from '$interfaces'; // I use angular paths, you should too!

// Define the action types
export enum MyTypes {
  ONE = 'ACTION_ONE',
  TWO = 'ACTION_TWO',
  THREE = 'ACTION_THREE',
}

export class OneAction extends BaseAction<MyTypes.ONE> {};
export class TwoAction extends BasePayloadAction<MyTypes.TWO, SomeInterface> {};
export class ThreeAction extends BaseErrorAction<MyTypes.THREE, ErrorInterface, OtherInterface> {};

/**
 * These actions have the following forms:
 * class OneAction {
 *   public readonly type: MyTypes.ONE;
 * }
 * 
 * class TwoAction {
 *   public readonly type: MyTypes.TWO;
 *   constructor(public readonly payload: SomeInterface) {}
 * }
 * 
 * class ThreeAction {
 *   public readonly type: MyTypes.THREE;
 *   constructor(
 *     public readonly error: ErrorInterface,
 *     public readonly payload: OtherInterface
 *   ) {}
 * }
 */

// Then export the discriminated union!
export type MyActions = OneAction | TwoAction | ThreeAction;
```

These actions are used in components the same way idiomatic ngrx actions are, ie. with the ```new``` keyword:

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

// And a store dispatch would looke something like..
  public someComponentFunction(data: SomeInterface) {
    this.store.dispatch(new OneAction(date));
  }
```

Lastly, some reducer code using the Class Actions:

```ts
import { MyActions, MyTypes } from '$store';

// Type Narrowing in reducers also works the same as before!
// But don't go console.log'ing in your reducers..
function someReducer(action: MyActions) {
  switch (action.type) {
    case MyTypes.ONE:
      return console.log('Got one action, no payload!');
    case MyTypes.TWO:
      return console.log('Got one action', action.payload.string, actions.payload.things);
    case MyTypes.THREE:
      return console.error('Got three action', action.error, action.payload.blah);
    default:
      console.log('Got default');
  }
}
```

### Factory Function Based Actions, PayloadActions, and ErrorActions (Experimental)
**Note: These functions are in progress, there are some rough edges to smooth out. The API is likely to change and they may be removed altogether.

Following are snippets for using the provided factory functions for creating action factories and actions.

```ts
import { action, payloadAction, errorAction } from '@nll/ngrxtras';
import { SomeInterface, OtherInterface, ErrorInterface } from '$interfaces'; // I use angular paths, you should too!

// Define the action types
export enum MyTypes {
  ONE = 'ACTION_ONE',
  TWO = 'ACTION_TWO',
  THREE = 'ACTION_THREE',
}

// A side effect of the enum type is that the generics need to be defined and passed as an argument.
export const oneAction = action(MyTypes.ONE);
export const twoAction = payloadAction<MyTypes.TWO, {stuff: string}>(MyTypes.TWO);
export const threeAction = errorAction<MyTypes.THREE, Error>(MyTypes.THREE);
export const threePlusAction = errorAction<MyTypes.THREE, Error, {stuff: number}>(MyTypes.THREE);

/**
 * These action factories output objects of the following forms:
 * oneAction(...) === {
 *   type: MyTypes.ONE;
 * }
 * 
 * twoAction(...) === {
 *   type: MyTypes.TWO;
 *   payload: {stuff: string};
 * }
 * 
 * threeAction(...) === {
 *   type: MyTypes.THREE;
 *   error: Error,
 *   payload: undefined,
 * }
 * 
 * threeActionPlus(...) === {
 *   type: MyTypes.THREE;
 *   error: Error,
 *   payload?: {stuff: number},
 * }
 */

// Then export the discriminated union.. which might not work.
export type MyActions = oneAction | twoAction | threeAction | threePlusAction;
```