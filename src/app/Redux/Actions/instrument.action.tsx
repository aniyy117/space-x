import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import instrument_Sercices from "../../services/instrument.services";

import Papa from "papaparse";

// -------------------------------------------------------------------------------------
// api actions
// -------------------------------------------------------------------------------------
var commonConfig = { delimiter: "," };

export interface GetInstrumentsAction {}

const getInstruments = createAsyncThunk(
  "instruments/get",
  async (arg: GetInstrumentsAction, { rejectWithValue }) => {
    try {
      const { data } = await instrument_Sercices.get();
      const newArr: any = [];
      Papa.parse(data, {
        ...commonConfig,
        complete: (result: any) => {
          let res = result.data;

          const headers = res[0];

          for (let i = 1; i < res.length - 1; i++) {
            const obj: any = {};
            const currentline = res[i];
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            newArr.push({ id: i, ...obj });
          }
        },
      });
      return {
        instruments: newArr,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const resetInstrument = createAction("instruments/reset");

// -------------------------------------------------------------------------------------
// exports
// -------------------------------------------------------------------------------------

export { getInstruments, resetInstrument };
