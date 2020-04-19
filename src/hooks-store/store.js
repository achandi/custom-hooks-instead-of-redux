import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload); //eessentially the same as redux where reducers return a new state
    globalState = { ...globalState, ...newState }; //merging global state with everything in new state

    for (const listener of listeners) {
      listener(globalState); //here u register the new state with each listener (e.g. setState(new global state))
    }
  };

  //  listeners.push(setState);
  // u want to register listener when component mounts but u also want to clear listeners array whenever component gets unmounte
  //solution is to use useEffect to initialze, and then return the
  useEffect(() => {
    if (shouldListen) listeners.push(setState);

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((lis) => lis !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
