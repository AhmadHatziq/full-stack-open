import '../App.css'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.length === 0){
        return null 
    }
  
    return (
      <div className='notification'>
        {message}
      </div>
    )
}

export default Notification 