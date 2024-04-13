import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  form: {
   
  },
  paid:false,
  email:"",
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      return { ...state, value: true }; // Return a new state object with the updated value
    },
    decrement: (state) => {
      return { ...state, value: false }; // Return a new state object with the updated value
    },
     setForm: (state, action) => {
      state.form = action.payload;
    },
    setPaid: (state) => {
      return { ...state, paid:true };
    },
    setunPaid: (state) => {
      return { ...state, paid:false };
    },
    setemail: (state, action) => {
      return { ...state, email: action.payload };
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, setunPaid,decrement,setForm, setemail,setPaid,incrementByAmount } = counterSlice.actions

export default counterSlice.reducer;
