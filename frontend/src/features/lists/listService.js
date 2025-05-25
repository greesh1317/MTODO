import axios from 'axios'

const API_URL = '/api/lists'

const createList = async (listData, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response= await axios.post(API_URL, listData, config)

    return response.data
}

const getLists = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response= await axios.get(API_URL, config)

    return response.data
}

const deleteList = async (listId,token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response= await axios.delete(API_URL + listId, config)

    return response.data
}

const listService = {
    createList,
    getLists,
    deleteList,
}

export default listService