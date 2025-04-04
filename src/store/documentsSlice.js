import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action) => {
      state.documents = state.documents.filter(
        (doc) => doc.id !== action.payload
      );
    },
  },
});

export const { addDocument, removeDocument } = documentsSlice.actions;
export default documentsSlice.reducer;
