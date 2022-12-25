import {
  createEntityAdapter,
  createReducer,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { ADMIN } from "../../services/admin.service";
import { getQuotes, resetQuotes } from "../Actions/quotes.action";

import { RootState } from "../storeConfigurations";

export interface Quotes {
  id: number;
  valid_till: string | number | Date;
  price: number;
}

const Quotesadaptor = createEntityAdapter<Quotes>({
  selectId: (Quotes) => Quotes.id,
});

type AdditionalFields = {};

type IQuotesReducer = EntityState<Quotes> & AdditionalFields;

const additionalFields: AdditionalFields = {};

const initialState: IQuotesReducer = Object.assign(
  {},
  Quotesadaptor.getInitialState(),
  additionalFields
);

const QuotesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getQuotes.fulfilled, (state, action: any) => {
      Quotesadaptor.setAll(state, action.payload.quotes);
    })
    .addCase(getQuotes.rejected, (_state, action) => {
      ADMIN.toast.throwError(action.error, "server error");
    });

  builder.addCase(resetQuotes, () => initialState);
});

// -----------------------------------------------------------------------------------
// selectors

const selectors = Quotesadaptor.getSelectors<RootState>(
  (state) => state.quotes
);

const selectSortData = createSelector(selectors.selectAll, (quotes) => {
  return quotes.sort(
    (a, b) => +new Date(a.valid_till) - +new Date(b.valid_till)
  );
});

const selectAllValidDate = createSelector(selectors.selectAll, (quotes) => {
  //@ts-ignore
  const uniqueDates = [ ...new Set(quotes.map((date) => date.valid_till.toString())), ];
  return uniqueDates;
});

const QuotesSelectors = Object.assign(
  {},
  {
    selectSortData,
    selectAllValidDate,
  },
  selectors
);

// -----------------------------------------------------------------------------------
// exports

export { QuotesReducer, initialState as QuotesReducerInit, QuotesSelectors };
