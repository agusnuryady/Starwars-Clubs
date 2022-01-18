import { all, fork } from 'redux-saga/effects';
import api from '../services/Api'

/* ------------- Sagas ------------- */
import { fetchLocation, fetchLogin, fetchLogout, fetchRegister } from './PersistSaga'
import { fetchAccept, fetchCreate, fetchDecline, fetchRecruit } from './AllianceSaga';

function * PersistSagas () {
    yield all([
        fork(fetchRegister, api),
        fork(fetchLogin),
        fork(fetchLogout),
        fork(fetchLocation)
    ])
}

function * AllianceSagas () {
    yield all([
        fork(fetchCreate, api),
        fork(fetchRecruit),
        fork(fetchAccept),
        fork(fetchDecline)
    ])
}

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    yield all([
        fork(PersistSagas),
        fork(AllianceSagas)
    ])
}