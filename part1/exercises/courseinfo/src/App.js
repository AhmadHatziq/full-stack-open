
// Component rendering the Header. 
const Header = (props) => {
  return (
    <h1>{props.header}</h1>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header header={course.name}/>
      <Content 
        parts = {course.parts}
      />
      <Total total={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}/>
    </div>
  )
}

export default App; 
