import { Link } from 'react-router-dom'

// Menu component 
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/anecdotes' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
      <Link to='/home' style={padding}>home</Link>
    </div>
  )
}

export { Menu }