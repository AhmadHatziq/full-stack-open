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

export default Course; 
