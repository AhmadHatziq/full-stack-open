
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
      <Part part={props.part1} exercise={props.exercise1}/>
      <Part part={props.part2} exercise={props.exercise2}/>
      <Part part={props.part3} exercise={props.exercise3}/>
    </>
  )
};

// Component rendering each part 
const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
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
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1} part2={part2} part3={part3}
        exercise1={exercise1} exercise2={exercise2} exercise3={exercise3} 
      />
      <Total total={exercise1 + exercise2 + exercise3}/>
    </div>
  )
}

export default App; 
