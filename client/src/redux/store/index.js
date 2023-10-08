import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/index.js";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
    applyMiddleware(thunk)
);

store.subscribe(()=>{///esto es para ver el stado de nuestra store ,cada vez que haya un estado nuevo veremos la info
  console.log(store.getState())
})