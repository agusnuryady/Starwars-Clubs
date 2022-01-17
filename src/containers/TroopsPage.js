import React from 'react'
import { View, Text } from 'react-native'
import { AvailableTroopsComonent, HeaderComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

const TroopsPage = ({route, navigation}) => {

    const contextValues = () => {
        return {
            navigation
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <HeaderComponent />
                <AvailableTroopsComonent />
            </View>
        </ContextProvider>
    )
}

export default TroopsPage
