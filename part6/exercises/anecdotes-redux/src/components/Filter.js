import { useDispatch } from 'react-redux'

const Filter = () => {

  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    
    // input-field value is in variable event.target.value
    // Set the state filter value. 
    const filterValue = event.target.value
    dispatch({ type: 'filter/setFilter', 'payload': filterValue })
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter