import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  // Use display: none to hide the content 
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // Used to toggle the Boolean visibility variable 
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // The useImperativeHandle() hook is used to make the toggleVisibility function available outside of the 
  // component. 
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  // Use props.children to automatically render any child components 
  // By default, var is False. hideWhenVisible is shown by default. 
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable