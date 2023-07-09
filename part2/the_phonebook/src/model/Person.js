const Person = (person) => {
    return (
      <div style={{padding:'5px', display:'flex', alignItems:'center', gap:'10px'}}>
        <strong>Name:</strong> {person.name} <strong>Number:</strong> {person.number}
      </div>
    )
}

export default Person;