import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Geolocation  from '@react-native-community/geolocation'
import { useDispatch, useSelector } from 'react-redux'
import PushNotification from 'react-native-push-notification'

import { AllianceListComponent, CreateAllianceModal, HeaderComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'
import PersistActions from '../redux/PersistRedux'

const ExplorePage = ({route, navigation}) => {
    const dispatch = useDispatch()
    const persistState = useSelector(state => state.persist)
    const allianceState = useSelector(state => state.alliance)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            const data = {
                ...persistState.authUser,
                lat: info.coords.latitude,
                long: info.coords.longitude
            }
            dispatch(PersistActions.locationRequest(data))
        })
    }, [])

    useEffect(() => {
        const myReq = allianceState.troops?.filter(item => item.email === persistState.authUser.email && item.status === 'requested')
        if (myReq.length > 0) {
            PushNotification.localNotification({
                channelId: "channel-id-1",
                title: 'Alliance Invitation',
                message: 'You Have Invitation From Alliance!'
            })
        } 
    }, [allianceState, persistState])

    const contextValues = () => {
        return {
            navigation,
            modalVisible,
            setModalVisible
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <HeaderComponent />
                <AllianceListComponent />
                <CreateAllianceModal/>
            </View>
        </ContextProvider>
    )
}

export default ExplorePage
