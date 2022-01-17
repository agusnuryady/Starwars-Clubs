import { all, fork } from 'redux-saga/effects';
import api from '../services/Api'

/* ------------- Sagas ------------- */
import { fetchLogin, fetchLogout, fetchRegister } from './PersistSaga'
import { fetchCreate } from './AllianceSaga';

function * PersistSagas () {
    yield all([
        fork(fetchRegister, api),
        fork(fetchLogin),
        fork(fetchLogout)
    ])
}

function * AllianceSagas () {
    yield all([
        fork(fetchCreate, api)
    ])
}

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    yield all([
        fork(PersistSagas),
        fork(AllianceSagas)
    ])
}