import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    createAllianceRequest: ['data','callback'],
    createAllianceSuccess: ['dataAlliances', 'dataTroops'],
    createAllianceFailure: ['err']
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_ALLIANCE_REQUEST]: requestAlliance,
    [Types.CREATE_ALLIANCE_SUCCESS]: successAlliance,
    [Types.CREATE_ALLIANCE_FAILURE]: failureAlliance
})