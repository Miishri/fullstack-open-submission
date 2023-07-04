const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = ( ) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }

  const Part = (values) => {
    return (
      <p>
        {values[0]} {values[1]}
      </p>
    )
  }

  const Content = () => {
    return (
      <div>
        <Part values={[part1, exercises1]}/>
        <Part values={[part2, exercises2]}/>
        <Part values={[part3, exercises3]}/>
      </div>
    )
  }

  const Total = () => {
    return (
      <div>
        <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  )
}

export default App