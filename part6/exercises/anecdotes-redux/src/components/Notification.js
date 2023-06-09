import { useSelector } from 'react-redux' 

const Notification = () => {

  const notification = useSelector(state => state.notification.notification)

  if (notification === null || notification.length === 0) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification