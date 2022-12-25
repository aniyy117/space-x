// react
import {
  combineReducers,
  CombinedState,
  AnyAction,
  Action,
  Middleware,
} from "redux";

// vendors
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  InstrumentsReducer,
  InstrumentsReducerInit,
} from "./Reducers/instrument.reducer";
import { QuotesReducer, QuotesReducerInit } from "./Reducers/quotes.reducer";
import { ThemeReducer, ThemeReducerInit } from "./Slice/theme.slice";
import { HistoryReducer, HistoryReducerInit } from "./Reducers/history.reducer";
import { AddressReducer, AddressReducerInit } from "./Reducers/address.reducer";

const reducers = combineReducers({
  instruments: InstrumentsReducer,
  quotes: QuotesReducer,
  theme: ThemeReducer,
  history: HistoryReducer,
  address: AddressReducer,
});

export type RootState = ReturnType<typeof reducers>;

const defaultState: RootState = {
  instruments: InstrumentsReducerInit,
  quotes: QuotesReducerInit,
  theme: ThemeReducerInit,
  history: HistoryReducerInit,
  address: AddressReducerInit,
};

const rootReducer = (
  state: CombinedState<RootState> | undefined,
  action: AnyAction
) => {
  if (action.type === "RESET_ALL") state = defaultState;

  return reducers(state, action);
};

// ------------------------------------------------------------------------------------------
// services

export interface Services {}
const services = {};

let middleware: Middleware[] = [];

if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, logger];
}

export const storeConfig = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: services,
        },
      }).concat(middleware);
    },
  });
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  Services,
  Action
>;
