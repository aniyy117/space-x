import {
  createEntityAdapter,
  createReducer,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { ADMIN } from "../../services/admin.service";
import { RootState } from "../storeConfigurations";
import { getAddress, resetAddress } from "../Actions/history.actions";
import { fuzzySearch } from "../../ui-componets/utils/fuzzySearch";

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
    payload_id: item.payload_id,
    payload_type: item.payload_type,
    payload_mass_kg: item.payload_mass_kg
      ? item.payload_mass_kg.toString()
      : "0",
    payload_mass_lbs: item.payload_mass_lbs
      ? item.payload_mass_lbs.toString()
      : "0",
    nationality: item.nationality ? item.nationality : "-",
    manufacturer: item.manufacturer ? item.manufacturer : "-",
    orbit: item.orbit ? item.orbit : "-",
    customers: item.customers ? item.customers.join(", ") : "-",
  }));
});

const selectFilterData = createSelector(
  selectFilterderKeys,
  (state: RootState, quary: string | "") => quary,
  (data, quary) => {
    const filterData = fuzzySearch(data, quary);
    const pageData = [];
    for (let i = 0; i < filterData.length; i++) {
      const newArr = [];
      for (let j = 0; j < 10; j++) {
        if (filterData[i]) {
          newArr.push(filterData[i]);
          i++;
        }
      }
      pageData.push(newArr);
    }

    return pageData;
  }
);

const AddressSelectors = Object.assign(
  {},
  {
    selectFilterderKeys,
    selectFilterData,
  },
  selectors
);

// -----------------------------------------------------------------------------------
// exports

export { AddressReducer, initialState as AddressReducerInit, AddressSelectors };
