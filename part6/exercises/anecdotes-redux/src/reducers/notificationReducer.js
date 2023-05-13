import { createSlice } from '@reduxjs/toolkit'

const initialNotification = {notification: ''}

const notificationSlice = createSlice({
  name: 'notification', 
  initialState: initialNotification, 
  reducers: {

    // Returns the new state for the notification string. 
    setNotification(state, action) {

      // console.log('setNotification state: ', JSON.parse(JSON.stringify(state)))
      // console.log('setNotification action: ', action)

      // Set the state to the payload string 
      state.notification = action.payload

    }, 

  }
})

export const notifyAndRemove = ({notificationString, durationInSeconds}) => {
  return async dispatch => {

    // Display the notification using the notificationSlice 
    dispatch({ type: 'notification/setNotification', 'payload': notificationString })

    // Remove the notification after the specified duration 
    setTimeout(() => {
      dispatch({type: 'notification/setNotification', payload: ''})
    }, parseInt(durationInSeconds) * 1000)

  }
}

export const { setNotification } = notificationSlice.actions 
export default notificationSlice.reducer 
