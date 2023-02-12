import {combineReducers, legacy_createStore} from "redux";
import {countReducer} from "./countReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    countReducer: countReducer,
 /*   maxValue: countReducer,
    startValue: countReducer,
    error: countReducer,
    settings: countReducer*/
})

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppRootStateType = ReturnType<typeof rootReducer>