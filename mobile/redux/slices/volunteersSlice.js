import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  volunteers: [],
  isLoading: false,
  error: null,
};

const volunteersSlice = createSlice({
  name: 'volunteers',
  initialState,
  reducers: {
    setVolunteers: (state, action) => {
      state.volunteers = action.payload;
      state.error = null;
    },
    addVolunteer: (state, action) => {
      state.volunteers.push(action.payload);
    },
    updateVolunteer: (state, action) => {
      const index = state.volunteers.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.volunteers[index] = action.payload;
      }
    },
    removeVolunteer: (state, action) => {
      state.volunteers = state.volunteers.filter(v => v.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setVolunteers, addVolunteer, updateVolunteer, removeVolunteer, setLoading, setError } = volunteersSlice.actions;
export default volunteersSlice.reducer;
