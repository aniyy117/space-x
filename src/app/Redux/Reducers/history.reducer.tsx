import {
  createEntityAdapter,
  createReducer,
  EntityState,
} from "@reduxjs/toolkit";
import { ADMIN } from "../../services/admin.service";
import { RootState } from "../storeConfigurations";
import { getHistory, resetHistory } from "../Actions/history.actions";

export interface History {
  id: number;
  title: string;
  details: string;
  event_date_unix: number;
  event_date_utc: number;
  flight_number: number;
  links: {
    reddit: string | null;
    article: string | null;
    wikipedia: string | null;
  };
}

const Historyadaptor = createEntityAdapter<History>({
  selectId: (History) => History.id,
});

type AdditionalFields = {};

type IHistoryReducer = EntityState<History> & AdditionalFields;

const additionalFields: AdditionalFields = {};

const initialState: IHistoryReducer = Object.assign(
  {},
  Historyadaptor.getInitialState(),
  additionalFields
);

const HistoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getHistory.fulfilled, (state, action: any) => {
      Historyadaptor.setAll(state, action.payload.history);
    })
    .addCase(getHistory.rejected, (_state, action) => {
      ADMIN.toast.throwError(action.error, "server error");
    });

  builder.addCase(resetHistory, () => initialState);
});

// -----------------------------------------------------------------------------------
// selectors

const HistorySelectors = Historyadaptor.getSelectors<RootState>(
  (state) => state.history
);

// -----------------------------------------------------------------------------------
// exports

export { HistoryReducer, initialState as HistoryReducerInit, HistorySelectors };
