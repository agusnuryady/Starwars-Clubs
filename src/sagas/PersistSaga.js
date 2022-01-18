import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects'
import { Alert } from 'react-native';
import { navigate, reset } from '../services/RootNavigation'
import { WORDS } from '../constants';

import PersistActions, { PersistTypes } from '../redux/PersistRedux';

export function * fetchRegister (api) {
    yield takeLeading(PersistTypes.REGISTER_REQUEST, fetchRegisterAPI, api)
}

export function * fetchRegisterAPI (api, { data }) {
    try {
        const { users } = yield select(state => state.persist)
        const peoples = yield call(api.getAllPeople)
        if (peoples.ok) {
            const filter = peoples?.data?.results?.filter((item) => item.name.toLowerCase() === data.fullname.toLowerCase())
            const people = yield call(api.getPeople, filter.length > 0 ? filter[0].uid : 1)
            if (people.ok) {
                let user = {...people.data.result, ...data}
                const validUser = users.filter((item) => item.email === data.email)
                if (validUser.length === 0) {
                    let datas = [...users, user]
                    navigate('Login')
                    yield put(PersistActions.registerSuccess(datas))
                } else {
                    Alert.alert(WORDS.EMAIL_HAS_USED)
                    yield put(PersistActions.registerFailure(people))
                }
            } else {
                yield put(PersistActions.registerFailure(people))
            }
        } else {
            yield put(PersistActions.registerFailure(peoples))
        }
    } catch (error) {
        yield put(PersistActions.registerFailure(error))
    }
}

export function * fetchLogin () {
    yield takeLeading(PersistTypes.LOGIN_REQUEST, fetchLoginAPI)
}

export function * fetchLoginAPI ({ data, callback }) {
    try {
        const { users } = yield select(state => state.persist)
        const user = users.filter((item,index) => item.email === data.email)
        if (user.length > 0) {
            if (user[0].password !== data.password) {
                if (callback) callback(WORDS.WRONG_PASSWORD)
                Alert.alert(WORDS.WRONG_PASSWORD)
                yield put(PersistActions.loginFailure(WORDS.WRONG_PASSWORD))
            } else {
                yield put(PersistActions.loginSuccess(user[0]))
                reset('Home')
            }
        } else {
            if (callback) callback(WORDS.EMAIL_NOT_FOUND)
            Alert.alert(WORDS.EMAIL_NOT_FOUND)
            yield put(PersistActions.loginFailure(WORDS.EMAIL_NOT_FOUND))
        }
    } catch (error) {
        yield put(PersistActions.loginFailure(error))
    }
}

export function * fetchLogout () {
    yield takeLeading(PersistTypes.LOGOUT_REQUEST, fetchLogoutAPI)
}

export function * fetchLogoutAPI () {
    try {
        yield put(PersistActions.logoutSuccess())
        reset('Login')
    } catch (error) {
        yield put(PersistActions.logoutFailure(error))
    }
}

export function * fetchLocation () {
    yield takeLeading(PersistTypes.LOCATION_REQUEST, fetchLocationAPI)
}

export function * fetchLocationAPI ({ data }) {
    try {
        const { users } = yield select(state => state.persist)
        const filter = users.filter(item => item.email !== data.email)
        const datas = [...filter, data]
        yield put(PersistActions.locationSuccess(datas))
    } catch (error) {
        yield put(PersistActions.locationFailure(error))
    }
}
