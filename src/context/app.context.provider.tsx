import React, {FC, ReactNode, useReducer} from 'react';

import {AppContext} from './app.context';
import reducer from './app.context.reducer';
import initialState from './initialState';

export const AppContextProvider: FC<{
  children: ReactNode;
}> = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
