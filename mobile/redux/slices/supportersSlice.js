import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  supporters: [],
  isLoading: false,
  error: null,
};

const supportersSlice = createSlice({
  name: 'supporters',
  initialState,
  reducers: {
    setSupporters: (state, action) => {
      state.supporters = action.payload;
      state.error = null;
    },
    addSupporter: (state, action) => {
      state.supporters.push(action.payload);
    },
    updateSupporter: (state, action) => {
      const index = state.supporters.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.supporters[index] = action.payload;
      }
    },
    removeSupporter: (state, action) => {
      state.supporters = state.supporters.filter(s => s.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSupporters, addSupporter, updateSupporter, removeSupporter, setLoading, setError } = supportersSlice.actions;
export default supportersSlice.reducer;
