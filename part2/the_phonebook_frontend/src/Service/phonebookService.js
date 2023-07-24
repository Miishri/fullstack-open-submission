import axios from "axios";

const URL = "/phonebook";

const getAll = () => {
    const getRequest = axios.get(URL);
    return getRequest.then(getResponse => getResponse.data);
}
const getById = personId => {
    const getRequest = axios.get(`${URL}/${personId}`)
    return getRequest.then(getResponse => getResponse.data)
}

const createPerson = newPerson => {
    const postRequest = axios.post(URL, newPerson);
    return postRequest.then(postResponse => postResponse.data);
}

const updatePerson = (personId, updatedPerson) => {
    const putRequest = axios.put(`${URL}/${personId}`, updatedPerson);
    return putRequest.then(putResponse => putResponse.data);
}

const deletePerson = (personId) => {
    const deleteRequest = axios.delete(`${URL}/${personId}`)
    return deleteRequest.then(deleted => {
        return true;
    })
  };

const Service = {
    getAll,
    createPerson,
    getById,
    updatePerson,
    deletePerson
}
  
export default Service;