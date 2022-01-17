import React from 'react'
import { View, Text } from 'react-native'
import { LoginFormComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

const LoginPage = ({ navigation }) => {
    
    const contextValues = () => {
        return {
            navigation
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <LoginFormComponent />
            </View>
        </ContextProvider>
    )
}

export default LoginPage
