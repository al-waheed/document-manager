import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  loading: false,
  error: null,
};

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.invoices.findIndex(
        (inv) => inv.id === action.payload.id
      );
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (inv) => inv.id !== action.payload
      );
    },
  },
});

export const { addInvoice, updateInvoice, deleteInvoice } =
  invoicesSlice.actions;
export default invoicesSlice.reducer;