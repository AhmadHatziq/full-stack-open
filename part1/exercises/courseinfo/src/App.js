
// Component rendering the Header. 
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}; 

// Component rendering the content 
const Content = (props) => {
  return(
    <>
      {props.parts.map(part => <Part part = {part}/>)}
    </>
  )
};

// Component rendering each part 
const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}; 

// Component rendering the total. 
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}; 

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content 
        parts = {parts}
      />
      <Total total={parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}/>
    </div>
  )
}

export default App; 
