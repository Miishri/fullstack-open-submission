import { useState } from 'react'


const Header = ({value}) => {
  return (
    <>
      <h1>{value}</h1>
    </>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)

  const [anecdotes, setAnecdotes] = useState([
    {
      anecdote: 'If it hurts, do it more often.',
      vote: 0
    },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      vote: 0
    },
    {
      anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      vote: 0
    },
    {
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      vote: 0
    },
    {
      anecdote: 'Premature optimization is the root of all evil.',
      vote: 0
    },
    {
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      vote: 0
    },
    {
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      vote: 0
    },
    {
      anecdote: 'The only way to go fast, is to go well.',
      vote: 0
    }
  ])

  const [highest, setHighest] = useState(0);

  const getIndexHighestVotes = () => {
    let highest = anecdotes[0].vote
    let index = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (anecdotes[i].vote > highest) {
        highest = anecdotes[i]
        index = i
      }
    }
    return index;
  }

  
  function setRandomInt(){
    setSelected(Math.floor(Math.random() * anecdotes.length))
    setHighest(getIndexHighestVotes());
  }

  function incrementVote() {
    setAnecdotes((anecdote) => {
      setHighest(getIndexHighestVotes());
      const updatedAnecdotes = [...anecdote];
      updatedAnecdotes[selected].vote += 1;
      return updatedAnecdotes;
    })
  }

  return (
    <>
    <Header value={"Anecdote of the day"}/>
      {anecdotes[selected].anecdote}
      <br />
      has votes {anecdotes[selected].vote}
      <div>
        <button onClick={incrementVote}>Vote</button>
        <button onClick={setRandomInt} >next anecdote</button>
      </div>
    <Header value={"Anecdote with most votes"}/>
    <div>
      <p>{anecdotes[highest].anecdote}</p>
      <p>has votes {anecdotes[highest].vote}</p>
    </div>
    </>
  )
}

export default App