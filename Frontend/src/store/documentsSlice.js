import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = Array.isArray(action.payload) ? action.payload : [];
    },

    addDocument: (state, action) => {
      const document = action.payload;

      // Prevent duplicate documents.
      const exists = state.documents.some(
        (existingDocument) => existingDocument.id === document.id,
      );

      if (!exists) {
        state.documents.unshift(document);
      }
    },

    removeDocument: (state, action) => {
      state.documents = state.documents.filter(
        (document) => document.id !== action.payload,
      );
    },

    clearDocuments: (state) => {
      state.documents = [];
    },
  },
});

export const { setDocuments, addDocument, removeDocument, clearDocuments } =
  documentsSlice.actions;

export default documentsSlice.reducer;
