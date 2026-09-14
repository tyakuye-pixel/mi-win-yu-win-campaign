import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  income: [],
  isLoading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.error = null;
    },
    setIncome: (state, action) => {
      state.income = action.payload;
      state.error = null;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    addIncome: (state, action) => {
      state.income.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setExpenses, setIncome, addExpense, addIncome, setLoading, setError } = budgetSlice.actions;
export default budgetSlice.reducer;
