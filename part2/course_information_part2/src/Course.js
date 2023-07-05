import Part from './Part'

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
        </ul>
        </>
    )
}

export default Course