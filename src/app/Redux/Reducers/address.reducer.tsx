import {
  createEntityAdapter,
  createReducer,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { ADMIN } from "../../services/admin.service";
import { RootState } from "../storeConfigurations";
import { getAddress, resetAddress } from "../Actions/history.actions";

export interface Address {
  payload_id: string;
  payload_mass_kg: number;
  payload_mass_lbs: number;
  payload_type: string;
  reused: boolean;
  customers: string[];
  manufacturer: string;
  nationality: string;
  norad_id: number[];
  orbit: string;
  orbit_params: any;
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

const selectors = Addressadaptor.getSelectors<RootState>(
  (state) => state.address
);

const selectFilterderKeys = createSelector(selectors.selectAll, (data) => {
  return data.map((item) => ({
    id: item.payload_id,
    Payload: item.payload_id,
    "Payload Type": item.payload_type,
    Reused: item.reused,
    Nationality: item.nationality,
    Manufacturer: item.manufacturer,
    "Payload Mass/kg": item.payload_mass_kg,
    orbit: item.orbit,
  }));
});

const selectDataForPagination = createSelector(selectors.selectAll, (data) => {
  const pageData = [];
  for (let i = 0; i < data.length; i++) {
    const newArr = [];
    for (let j = 0; j < 10; j++) {
      if (data[i]) {
        newArr.push(data[i]);
        i++;
      }
    }
    pageData.push(newArr);
  }

  return pageData;
});

const AddressSelectors = Object.assign(
  {},
  {
    selectFilterderKeys,
    selectDataForPagination,
  },
  selectors
);

// -----------------------------------------------------------------------------------
// exports

export { AddressReducer, initialState as AddressReducerInit, AddressSelectors };
