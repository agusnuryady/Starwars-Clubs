import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects'
import { Alert } from 'react-native';
import { navigate } from '../services/RootNavigation'
import { WORDS } from '../constants';

import AllianceActions, { AllianceTypes } from '../redux/AllianceRedux';

export function * fetchCreate (api) {
    yield takeLeading(AllianceTypes.CREATE_ALLIANCE_REQUEST, fetchCreateAPI, api)
}

export function * fetchCreateAPI (api, { data, callback }) {
    try {
        const { alliances, troops } = yield select(state => state.alliance)
        const { authUser } = yield select(state => state.persist)
        const startship = yield call(api.getStarship)
        if (startship.ok) {
            const validAlliance = alliances.filter((item) => item.name === data.name)
            let alliance = {...startship.data.result, ...data}
            let troop = {
                ...authUser,
                alliance: data.name,
                status: 'active'
            }
            if (validAlliance.length === 0) {
                let dataTroops = [...troops, troop]
                let dataAlliances = [...alliances, alliance]
                navigate('GroupDetail', {item: alliance})
                if (callback) callback()
                yield put(AllianceActions.createAllianceSuccess(dataAlliances, dataTroops))
            } else {
                Alert.alert(WORDS.ALLIANCE_NAME_USED)
                yield put(AllianceActions.createAllianceFailure(startship))
            }
        } else {
            yield put(AllianceActions.createAllianceFailure(startship))
        }
    } catch (error) {
        yield put(AllianceActions.createAllianceFailure(error))
    }
}

export function * fetchRecruit () {
    yield takeLeading(AllianceTypes.RECRUIT_REQUEST, fetchRecruitAPI)
}

export function * fetchRecruitAPI ({ data }) {
    try {
        const { troops } = yield select(state => state.alliance)
        const troop = {
            ...data,
            status: 'requested'
        }
        const datas = [...troops, troop]
        yield put(AllianceActions.recruitSuccess(datas))
    } catch (error) {
        yield put(AllianceActions.recruitFailure(error))
    }
}

export function * fetchAccept () {
    yield takeLeading(AllianceTypes.ACCEPT_REQUEST, fetchAcceptAPI)
}

export function * fetchAcceptAPI ({ data }) {
    try {
        const { troops } = yield select(state => state.alliance)
        const filterTroop = troops.filter((item) => item.alliance === data.alliance && item.email !== data.email)
        const datas = [...filterTroop, data]
        yield put(AllianceActions.acceptSuccess(datas))
    } catch (error) {
        yield put(AllianceActions.acceptFailure(error))
    }
}

export function * fetchDecline () {
    yield takeLeading(AllianceTypes.DECLINE_REQUEST, fetchDeclineAPI)
}

export function * fetchDeclineAPI ({ data }) {
    try {
        const { troops } = yield select(state => state.alliance)
        const filterTroop = troops.filter((item) => item.alliance === data.alliance && item.email !== data.email)
        yield put(AllianceActions.declineSuccess(filterTroop))
    } catch (error) {
        yield put(AllianceActions.declineFailure(error))
    }
}
