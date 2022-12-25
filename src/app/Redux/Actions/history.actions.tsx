import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import MainSerices from "../../services/main.services";

export interface GetHistoryAction {}

const getHistory = createAsyncThunk(
  "history/get",
  async (arg: GetHistoryAction, { rejectWithValue }) => {
    try {
      const { data } = await MainSerices.get();
      return {
        history: data,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export interface GetAddressAction {}

const getAddress = createAsyncThunk(
  "address/get",
  async (arg: GetAddressAction, { rejectWithValue }) => {
    try {
      const { data } = await MainSerices.getAddRess();
      return {
        address: data,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const resetAddress = createAction("address/reset");

const resetHistory = createAction("history/reset");

// -------------------------------------------------------------------------------------
// exports
// -------------------------------------------------------------------------------------

export { getHistory, resetHistory, getAddress, resetAddress };
