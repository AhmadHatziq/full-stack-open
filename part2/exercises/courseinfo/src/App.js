
// Component rendering a single Course. 
const Course = ({course}) => {

  return(
    <>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}/>
    </>
  )
}

// Component rendering the Header. 
const Header = ({header}) => {
  return (
    <h2>{header}</h2>
  )
}; 

// Component rendering the content 
const Content = ({parts}) => {
  return(
    <>
      {parts.map(part => <Part part={part} key={part.id}/>)}
    </>
  )
};

// Component rendering each part 
const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}; 

// Component rendering the total. 
const Total = ({total}) => {
  return (
    <>
      <b><p>total of {total} exercises</p></b>
    </>
  )
}; 

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course} key={course.id}/>)}
    </div>
  )
}

export default App; 
