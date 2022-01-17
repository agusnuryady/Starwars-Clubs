import apisauce from 'apisauce'
import config from '../../config'

let apiUrl = config.baseURL

// ------
// STEP 1
// ------
//
// Create and configure an apisauce-based api object.
//
const apiWrapper = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: apiUrl,
    timeout: 10000
})

const getApiWrapper = () => {
    return apiWrapper.getBaseURL()
}

const changeApiWrapper = (url) => {
    return apiWrapper.setBaseURL(url)
}

// const headerWithToken = (authorization) => {
// return {
//     headers: {
//         authorization
//     }
//     }
// }

if (__DEV__) {
    const navMonitor = (response) => console.log(`API DEBUG! response =`, response)
    apiWrapper.addMonitor(navMonitor)
}

// ------
// STEP 2
// ------
//
// Define some functions that call the api.  The goal is to provide
// a thin wrapper of the api layer providing nicer feeling functions
// rather than "get", "post" and friends.
//
// I generally don't like wrapping the output at this level because
// sometimes specific actions need to be take on `403` or `401`, etc.
//
// Since we can't hide from that, we embrace it by getting out of the
// way at this level.
//

// news
const getAllPeople = () => {
    return apiWrapper.get(`/api/people?page=1&limit=82`)
}

const getPeople = (uid=1) => {
    return apiWrapper.get(`api/people/${uid}`)
}

const getStarship = (uid=9) => {
    return apiWrapper.get(`api/starships/${uid}`)
}

export default {
    getAllPeople,
    getPeople,
    getStarship
}