import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { AvailableTroopsComonent, HeaderComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

const TroopsPage = ({route, navigation}) => {
    const item = route?.params?.item || null
    const persistState = useSelector(state => state.persist)
    const allianceState = useSelector(state => state.alliance)

    const contextValues = () => {
        return {
            navigation,
            persistState,
            allianceState,
            item
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
