import Part from './Part'

const Total = ({course}) => {
    return ( 
    <li>
        <strong>Total of &nbsp;

            {
            course.parts.reduce((total, part) => 
            total + part.exercises, 0)
            }
        
        </strong>
    </li>
    )
} 

const Course = ({course}) => {
    console.log(course)

    return (
        <>
        <h1 key={course.id}>{course.name}</h1>
        <ul>
            {
                course.parts.map(part => 
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )
            }
            <Total course={course} />
        </ul>
        </>
    )
}

export default Course