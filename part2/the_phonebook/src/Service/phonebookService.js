import axios from "axios";

const dbURL = "http://localhost:3001/persons";

const getAll = () => {
    const getRequest = axios.get(dbURL);
    return getRequest.then(getResponse => getResponse.data);
}

const createPerson = newPerson => {
    const postRequest = axios.post(dbURL, newPerson);
    return postRequest.then(postResponse => postResponse.data);
}

const updatePerson = (personId, updatedPerson) => {
    const putRequest = axios.put(`${dbURL}/${personId}`, updatedPerson);
    return putRequest.then(putResponse => putResponse.data);
}

const deletePerson = (personId) => {
    const deleteRequest = axios.delete(`${dbURL}/${personId}`);
    return deleteRequest;
  };
  
export default {
    getAll,
    createPerson,
    updatePerson,
    deletePerson
}