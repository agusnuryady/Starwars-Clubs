import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    createAllianceRequest: ['data','callback'],
    createAllianceSuccess: ['dataAlliances', 'dataTroops'],
    createAllianceFailure: ['err'],
    recruitRequest: ['data'],
    recruitSuccess: ['data'],
    recruitFailure: ['err'],
    acceptRequest: ['data'],
    acceptSuccess: ['data'],
    acceptFailure: ['err'],
    declineRequest: ['data'],
    declineSuccess: ['data'],
    declineFailure: ['err']
})

export const AllianceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    alliances: [],
    troops: [],
    fetchingAlliance: false,
    successAlliance: false,
    errAlliance: null
}

/* ------------- Reducers ------------- */

export const requestAlliance = (state) => {
    return {
        ...state,
        fetchingAlliance: true,
        successAlliance: false,
        errAlliance: null
    }
}

export const failureAlliance = (state, { err }) => {
    return {
        ...state,
        fetchingAlliance: false,
        successAlliance: false,
        errAlliance: err
    }
}

export const successAlliance = (state, { dataAlliances, dataTroops }) => {
    return {
        ...state,
        fetchingAlliance: false,
        successAlliance: true,
        errAlliance: null,
        alliances: dataAlliances,
        troops: dataTroops
    }
}

export const successRecruit = (state, { data }) => {
    return {
        ...state,
        fetchingAlliance: false,
        successAlliance: true,
        errAlliance: null,
        troops: data
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_ALLIANCE_REQUEST]: requestAlliance,
    [Types.CREATE_ALLIANCE_SUCCESS]: successAlliance,
    [Types.CREATE_ALLIANCE_FAILURE]: failureAlliance,
    [Types.RECRUIT_REQUEST]: requestAlliance,
    [Types.RECRUIT_SUCCESS]: successRecruit,
    [Types.RECRUIT_FAILURE]: failureAlliance,
    [Types.ACCEPT_REQUEST]: requestAlliance,
    [Types.ACCEPT_SUCCESS]: successRecruit,
    [Types.ACCEPT_FAILURE]: failureAlliance,
    [Types.DECLINE_REQUEST]: requestAlliance,
    [Types.DECLINE_SUCCESS]: successRecruit,
    [Types.DECLINE_FAILURE]: failureAlliance
})