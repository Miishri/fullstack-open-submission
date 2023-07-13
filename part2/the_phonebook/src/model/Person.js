const Person = (person) => {
  const personStyle = {
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }
    return (
      <div style={personStyle}>
        <strong>Name:</strong> {person.name} <strong>Number:</strong> {person.number}
      </div>
    )
}

export default Person;