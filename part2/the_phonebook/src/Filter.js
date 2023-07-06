import Person from './Person'

const Filter = ({filter, persons}) => {
    return (
        <>
        {
            persons.map((person) => {
                if (filter !== '') {
                    if (person.name.includes(filter)) {
                        return <Person key={person.id} person={person} />
                    }
                }else {
                    return <Person key={person.id} person={person} />
                }
            }
        )}
        </>
    )
}

export default Filter;