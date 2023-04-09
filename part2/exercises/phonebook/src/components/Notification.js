
const Notification = ({ message, notificationColor }) => {
    if (message === null || message.length === 0) {
      return null
    }

    // Define CSS class properties 
    const notificationStyle = {
        color: notificationColor,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }

  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
}

export default Notification 