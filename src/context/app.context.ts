import {DispatchWithoutAction, createContext} from 'react';
import initialState, {IInitialState} from './initialState';

//TODO: NEED TO TYPE REDUCER FUNCTION

export const AppContext = createContext<
  [IInitialState, (param: {type: any; payload: any}) => void]
>([initialState, () => null]);
