import Person from './Person'

const Filter = ({filter, persons}) => {
    return (
        <>
        {
            persons.map((person) => {
                if (filter !== '') {
                    if (person.name.includes(filter)) {
                        return <Person key={person.id} name={person.name} number={person.number} />
                    }
                }else {
                    return <Person key={person.id} name={person.name} number={person.number} />
                }
            }
        )}
        </>
    )
}

export default Filter;