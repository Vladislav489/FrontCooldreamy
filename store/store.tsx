import { createStore, Store } from "redux";
import reducer from "./reducer";
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { IGlobalState } from "./reducer";
import { composeWithDevTools } from '@redux-devtools/extension';



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

const store = createStore(reducer, composeWithDevTools())
export default store;

