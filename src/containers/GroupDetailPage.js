import React from 'react'
import { View, Text } from 'react-native'
import { HeaderComponent, ShipDetailComponent, TroopsListComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

const GroupDetailPage = ({route, navigation}) => {
    const item = route?.params?.item || null

    const contextValues = () => {
        return {
            navigation,
            item
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <HeaderComponent />
                <ShipDetailComponent />
                <TroopsListComponent />
            </View>
        </ContextProvider>
    )
}

export default GroupDetailPage
