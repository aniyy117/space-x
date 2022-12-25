import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import instrument_Sercices from "../../services/instrument.services";

// -------------------------------------------------------------------------------------
// api actions
// -------------------------------------------------------------------------------------
export interface GetquotesAction {
  symbol: string;
}

const getQuotes = createAsyncThunk(
  "quotes/get",
  async (arg: GetquotesAction, { rejectWithValue }) => {
    try {
      const { data } = await instrument_Sercices.get_quotes(arg.symbol);

      const newArr = data.payload[arg.symbol].map((ele: any, index: any) => ({
        id: index + 1,
        ...ele,
      }));
      return {
        quotes:newArr,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const resetQuotes = createAction("quotes/reset");

// -------------------------------------------------------------------------------------
// exports
// -------------------------------------------------------------------------------------

export { getQuotes, resetQuotes };
