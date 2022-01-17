import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { HeaderComponent, LogoutModal, ProfileStatusComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

const ProfilePage = ({ route,navigation }) => {
    const item = route?.params?.item || null
    const isLogout = route?.params?.isLogout || false
    const [modalVisible, setModalVisible] = useState(false)

    const contextValues = () => {
        return {
            navigation,
            item,
            isLogout,
            modalVisible,
            setModalVisible
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <HeaderComponent />
                <ProfileStatusComponent />
                <LogoutModal />
            </View>
        </ContextProvider>
    )
}

export default ProfilePage
