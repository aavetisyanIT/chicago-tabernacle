import React, {FC, ReactNode, useReducer} from 'react';

import {AppContext} from './app.context';
import reducer from './app.context.reducer';
import initialState from './initialState';

interface IAppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: FC<IAppContextProviderProps> = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
