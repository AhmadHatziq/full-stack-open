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

export const { setNotification } = notificationSlice.actions 
export default notificationSlice.reducer 
