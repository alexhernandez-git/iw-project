import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { SliceState, Expedient } from "../../utils/types";
import { createExpedient, fetchExpedient, updateExpedient } from "./API";

export interface ExpedientState {
  value: Expedient | null;
  status: SliceState;
}

const initialState: ExpedientState = {
  value: null,
  status: SliceState.Inactive,
};

export const getExpedient = createAsyncThunk(
  "expedients/getExpedient",
  async (id: string) => {
    const response = await fetchExpedient(id);
    return response.data.expedient;
  }
);

export const newExpedient = createAsyncThunk(
  "expedients/newExpedient",
  async (id: string) => {
    const response = await createExpedient(id);
    return response.data;
  }
);

export const editExpedient = createAsyncThunk(
  "expedients/editExpedient",
  async ({ id, data }: { id: string; data: any }) => {
    const response = await updateExpedient(id, data);
    return response.data.expedient;
  }
);

export const counterSlice = createSlice({
  name: "expedients",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getExpedient.pending, (state) => {
        state.status = SliceState.Loading;
      })
      .addCase(getExpedient.fulfilled, (state, action) => {
        state.status = SliceState.Success;
        state.value = action.payload;
      })
      .addCase(getExpedient.rejected, (state) => {
        state.status = SliceState.Failed;
      })
      .addCase(newExpedient.pending, (state) => {
        state.status = SliceState.Loading;
      })
      .addCase(newExpedient.fulfilled, (state, action) => {
        state.status = SliceState.Success;
        state.value = action.payload;
      })
      .addCase(newExpedient.rejected, (state) => {
        state.status = SliceState.Failed;
      })
      .addCase(editExpedient.pending, (state) => {
        state.status = SliceState.Loading;
      })
      .addCase(editExpedient.fulfilled, (state, action) => {
        state.status = SliceState.Success;
        state.value = action.payload;
      })
      .addCase(editExpedient.rejected, (state) => {
        state.status = SliceState.Failed;
      });
  },
});

export const {} = counterSlice.actions;

export const selectExpedient = (state: RootState) => state.expedients.value;

export default counterSlice.reducer;
