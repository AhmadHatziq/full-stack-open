import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'

const Notification = () => {

  const [notificationString, notificationStringDispatch] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notificationString === null || notificationString.length === 0 || notificationString === '') {
    return null 
  }

  return (
    <div style={style}>
      { notificationString }
    </div>
  )
}

export default Notification
