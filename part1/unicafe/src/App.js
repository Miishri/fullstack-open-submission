import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleClickBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }



  const course = {
    name: 'Give Feedback.',
    parts: [
      {
        name: 'good',
        value: good
      },
      {
        name: 'neutral',
        value: neutral
      },
      {
        name: 'bad',
        value: bad
      }
    ]
  }

  const Buttons = () => {
    return (
        <div>
        <button onClick={handleClickGood}>Good</button>
        <button onClick={handleClickNeutral}>Neutral</button>
        <button onClick={handleClickBad}>Bad</button>
        </div>
    )
  }

  const Header = ({course}) => {
    console.log(course)
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }

  const Part = (props) => {
    console.log(props.name + " " + props.exercises)
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }

  const Content = (props) => {
    console.log(props)
    return (
      <div>
        <Part name={props.parts[0].name} exercises={props.parts[0].value} />
        <Part name={props.parts[1].name} exercises={props.parts[1].value} />
        <Part name={props.parts[2].name} exercises={props.parts[2].value} />
      </div>
    )
  }

  const Total = (props) => {
    let total = props.parts[0].value + props.parts[1].value + props.parts[2].value
    return (
      <div>
        <p>Number of exercises {total}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Buttons />
      <Header course={"Statistics"}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App