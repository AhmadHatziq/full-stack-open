
const initialFilter = ''

const filterReducer = (state = initialFilter, action) => {

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