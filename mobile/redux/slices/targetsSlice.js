import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  targets: [],
  isLoading: false,
  error: null,
};

const targetsSlice = createSlice({
  name: 'targets',
  initialState,
  reducers: {
    setTargets: (state, action) => {
      state.targets = action.payload;
      state.error = null;
    },
    addTarget: (state, action) => {
      state.targets.push(action.payload);
    },
    updateTarget: (state, action) => {
      const index = state.targets.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.targets[index] = action.payload;
      }
    },
    removeTarget: (state, action) => {
      state.targets = state.targets.filter(t => t.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTargets, addTarget, updateTarget, removeTarget, setLoading, setError } = targetsSlice.actions;
export default targetsSlice.reducer;
