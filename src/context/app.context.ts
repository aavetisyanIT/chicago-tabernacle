import {DispatchWithoutAction, createContext} from 'react';
import initialState, {IInitialState} from './initialState';

export const AppContext = createContext<[IInitialState, DispatchWithoutAction]>(
  [initialState, () => null],
);
