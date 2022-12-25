import {
  createEntityAdapter,
  createReducer,
  EntityState,
} from "@reduxjs/toolkit";
import { ADMIN } from "../../services/admin.service";
import { getInstruments, resetInstrument } from "../Actions/instrument.action";
import { RootState } from "../storeConfigurations";

export interface Instruments {
  id: number;
}

const Instrumentsadaptor = createEntityAdapter<Instruments>({
  selectId: (Instruments) => Instruments.id,
});

type AdditionalFields = {};

type IInstrumentsReducer = EntityState<Instruments> & AdditionalFields;

const additionalFields: AdditionalFields = {};

const initialState: IInstrumentsReducer = Object.assign(
  {},
  Instrumentsadaptor.getInitialState(),
  additionalFields
);



const InstrumentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getInstruments.fulfilled, (state, action: any) => {
      Instrumentsadaptor.setAll(state, action.payload.instruments);
    })
    .addCase(getInstruments.rejected, (_state, action) => {
      ADMIN.toast.throwError(action.error, "server error");
    });

  builder.addCase(resetInstrument, () => initialState);
});

// -----------------------------------------------------------------------------------
// selectors

const InstrumentsSelectors = Instrumentsadaptor.getSelectors<RootState>(
  (state) => state.instruments
);

// -----------------------------------------------------------------------------------
// exports

export {
  InstrumentsReducer,
  initialState as InstrumentsReducerInit,
  InstrumentsSelectors,
};
