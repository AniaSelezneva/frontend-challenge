import React, { createContext, useReducer } from "react";

const initialState = {
  kitties: [],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_KITTIES":
        return { kitties: [...state.kitties, ...action.payload] };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
