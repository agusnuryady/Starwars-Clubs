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
                long: '',
                lat: '',
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
