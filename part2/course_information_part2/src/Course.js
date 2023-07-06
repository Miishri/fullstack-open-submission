import Part from './Part'

const Total = ({course}) => {
    return ( 
    <li>
        <strong>Total of &nbsp;

            {
            course.reduce((total, part) => 
            total + part.exercises, 0)
            }
        
        </strong>
    </li>
    )
} 

const Parts = ({parts}) => {
    return (
        parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )
    )
}

const Header = ({course}) => {
    return (
        <h1>
            {course.name}
        </h1>
    )
}

const Content = ({course}) => {
    return ( 
        <>
        <Header key={course.id} course={course}/>
        <ul>
            <Parts parts={course.parts}/>
            <Total course={course.parts} />
        </ul>
        </>
    )
}

const Course = ({course}) => {
    
    return (
        <>
        {
            course.map(value => 
                <Content course={value} /> //unsure about key error
            )
        }
        </>
    )
}

export default Course