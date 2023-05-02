import { createSlice } from '@reduxjs/toolkit'

const initialFilterState = ''

const filterSlice = createSlice({
  name: "filter", 
  initialState: initialFilterState, 
  reducers: {

    // Set the filter state value. Just returns the filterValue as the new state. 
    setFilter(state, action) {
      return action.payload 
    }

  }
})


export const { setFilter } = filterSlice.actions 
export default filterSlice.reducer 
