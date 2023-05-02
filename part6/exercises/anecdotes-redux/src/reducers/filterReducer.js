import { createSlice } from '@reduxjs/toolkit'

const initialFilterState = ''

const filterSlice = createSlice({
  name: "filter", 
  initialState: initialFilterState, 
  reducers: {

    // Set the filter state value 
    setFilter(state, action) {
      return action.payload.filterValue 
    }

  }
})


export const { setFilter } = filterSlice.actions 
export default filterSlice.reducer 

/*
const filterReducer = (state = initialFilterState, action) => {

  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filterValue
    default:
      return state
  }
}

export const setFilter = (filterValue) => {
  return {
    type: 'SET_FILTER', 
    payload: {
      'filterValue': filterValue
    }
  }
}

export default filterReducer
*/ 