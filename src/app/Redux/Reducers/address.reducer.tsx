import {
  createEntityAdapter,
  createReducer,
  EntityState,
} from "@reduxjs/toolkit";
import { ADMIN } from "../../services/admin.service";
import { RootState } from "../storeConfigurations";
import { getAddress, resetAddress } from "../Actions/history.actions";

export interface Address {
  payload_id: number;
}

const Addressadaptor = createEntityAdapter<Address>({
  selectId: (Address) => Address.payload_id,
});

type AdditionalFields = {};

type IAddressReducer = EntityState<Address> & AdditionalFields;

const additionalFields: AdditionalFields = {};

const initialState: IAddressReducer = Object.assign(
  {},
  Addressadaptor.getInitialState(),
  additionalFields
);

const AddressReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAddress.fulfilled, (state, action: any) => {
      Addressadaptor.setAll(state, action.payload.address);
    })
    .addCase(getAddress.rejected, (_state, action) => {
      ADMIN.toast.throwError(action.error, "server error");
    });

  builder.addCase(resetAddress, () => initialState);
});

// -----------------------------------------------------------------------------------
// selectors

const AddressSelectors = Addressadaptor.getSelectors<RootState>(
  (state) => state.address
);

// -----------------------------------------------------------------------------------
// exports

export { AddressReducer, initialState as AddressReducerInit, AddressSelectors };
