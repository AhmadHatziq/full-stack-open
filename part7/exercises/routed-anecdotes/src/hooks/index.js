import { useState } from 'react'

/*
  Custom hook used to simplify forms. 
  Type represent the form types eg 'text' 
*/
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clearField = () => {
    setValue('')
  }

  return {
    type,
    value,
    setValue,
    onChange, 
    clearField
  }
}

export { useField }