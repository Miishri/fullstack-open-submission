import { useDebugValue, useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [percent, setPercent] = useState(0)

  const handleClickGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    updateStatistics()
  }

  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    updateStatistics()
  }

  const handleClickBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    updateStatistics()
  }

  const incrementTotal = () => {
    const updatedTotal = total + 1
    setTotal(updatedTotal)
  }
 
  const handleUpdateAverage = () => {
    let updatedAverage = (good * 1 + neutral * 0 + bad * -1) / total
    if (isNaN(updatedAverage)) {
      updatedAverage = 0
    }
    setAverage(updatedAverage)
    console.log("average", updatedAverage)
  }

  const handleUpdatePercentage = () => {
    let updatedPercent = (good/total) * 100
    if (isNaN(updatedPercent)) {
      updatedPercent = 0
    }
    setPercent(updatedPercent)
    console.log("percent")
  }

  const updateStatistics = () => {
    incrementTotal()
    handleUpdateAverage()
    handleUpdatePercentage()
  }

  const course = {
    name: 'Give Feedback.',
    title: 'Statistics',
    parts: [
      {
        name: 'Good',
        value: good
      },
      {
        name: 'Neutral',
        value: neutral
      },
      {
        name: 'Bad',
        value: bad
      },
      {
        name: 'Total',
        value: total
      },
      {
        name: 'Tverage',
        value: average
      },
      {
        name: 'PositivePercent',
        value: percent
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
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <tr>
        <td>
          {props.name}
        </td>
        <td>
          {props.value}
        </td>
      </tr>
    )
  }

  const Votes = ({parts}) => {
    const [good, neutral, bad] = parts

    return (
      <>
        <Part name={good.name} value={good.value} />
        <Part name={neutral.name} value={neutral.value} />
        <Part name={bad.name} value={bad.value} />
      </>
    )
  }

  const Total = ({total}) => {
    return (
      <tr>
        <td>Total</td>
        <td>{total[3].value}</td>
      </tr>
    )
  }

  const Average = ({average}) => {
    return (
      <tr>
        <td>Average</td>
        <td>{average[4].value} </td>
      </tr>
    )
  }

  const Percent = ({percent}) => {
    return (
      <tr>
        <td>Percent</td>
        <td>{percent[3].value} %</td>
      </tr>
    )
  }

  const Statistics = ({parts}) => {
    if (parts[0].value || parts[1].value || parts[3].value) {

      return (
          <table>
            <tbody>
              <tr>
                <th>
                  <h1>Statistics</h1>
                </th>
              </tr>
              <>
                <Votes parts={parts} />
                <Total total={parts} />
                <Average average={parts} />
                <Percent percent={parts} />
              </>
            </tbody>
          </table>
      )

    }

    return (
      <p>No feedback given.</p>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Buttons />
      <Statistics parts={course.parts} />
    </div>
  )
}

export default App