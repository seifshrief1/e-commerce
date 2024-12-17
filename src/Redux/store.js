import { applyMiddleware, createStore } from "redux"; // Corrected
import { reducers } from "./CombineReduers";
import { thunk } from "redux-thunk";

export const store = createStore(reducers, applyMiddleware(thunk));
