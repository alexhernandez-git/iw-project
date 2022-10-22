import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { SliceState, ExpedientType } from "../../utils/types";
import { fetchExpedientTypes } from "./API";

export interface ExpedientTypesState {
  value: {
    count: number;
    page: number;
    size: number;
    data: ExpedientType[];
  };
  status: SliceState;
}

const initialState: ExpedientTypesState = {
  value: {
    count: 0,
    page: 0,
    size: 0,
    data: [],
  },
  status: SliceState.Inactive,
};

export const getExpedientTypes = createAsyncThunk(
  "expedients/getExpedientTypes",
  async ({
    page = 0,
    search = "",
    getAll = false,
  }: {
    page?: number;
    search?: string;
    getAll?: boolean;
  }) => {
    const response = await fetchExpedientTypes({ page, search, getAll });
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "expedientTypes",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getExpedientTypes.pending, (state) => {
        state.status = SliceState.Loading;
      })
      .addCase(getExpedientTypes.fulfilled, (state, action) => {
        state.status = SliceState.Success;
        state.value = action.payload;
      })
      .addCase(getExpedientTypes.rejected, (state) => {
        state.status = SliceState.Failed;
      });
  },
});

export const {} = counterSlice.actions;

export const selectExpedientTypes = (state: RootState) =>
  state.expedients.value;

export default counterSlice.reducer;
