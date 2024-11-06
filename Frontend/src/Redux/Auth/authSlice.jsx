import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const initialState = {
  name: "",
  userDetails: {},
  loading: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload
      };
    }
  },
  // Extra reducers to handle the async actions
  
});

export const { setName, setUserDetails } = authSlice.actions;

export default authSlice.reducer;
