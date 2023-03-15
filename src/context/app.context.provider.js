import React from 'react';

import { AppContext } from './app.context';
import reducer from './app.context.reducer';
import initialState from './initialState';

export const AppContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
