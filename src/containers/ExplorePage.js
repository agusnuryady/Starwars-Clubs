import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { AllianceListComponent, CreateAllianceModal, HeaderComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

const ExplorePage = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false)

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
