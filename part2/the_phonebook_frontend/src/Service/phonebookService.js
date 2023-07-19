import axios from "axios";

const dbURL = "/phonebook";

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
    return axios.delete(`${dbURL}/${personId}`);
  };
  
export default {
    getAll,
    createPerson,
    updatePerson,
    deletePerson
}