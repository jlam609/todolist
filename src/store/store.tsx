import { createStore, applyMiddleware } from "redux";
import thunks from "redux-thunk";
import reducer from "./reducer";

export const store = createStore(
  reducer,
  applyMiddleware(thunks)
);

export type StoreState = ReturnType<typeof reducer>;