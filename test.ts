import { action, payloadAction, errorAction } from './actionsFactories';

export enum MyTypes {
  ONE = 'ACTION_ONE',
  TWO = 'ACTION_TWO',
  THREE = 'ACTION_THREE',
}

const oneAction = action(MyTypes.ONE);
const twoAction = payloadAction<MyTypes.TWO, {stuff: string}>(MyTypes.TWO);
const threeAction = errorAction<MyTypes.THREE, Error>(MyTypes.THREE);
const threePlusAction = errorAction<MyTypes.THREE, Error, {stuff: number}>(MyTypes.THREE);

const instOne = oneAction();
const instTwo = twoAction({stuff: 'things'});
const instThree = threeAction(new Error('Got us an error!'));
const instThreePlus = threePlusAction(new Error('An error with payload'), {stuff: 6});