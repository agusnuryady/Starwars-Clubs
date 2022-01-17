import React from 'react'
import { View, Text } from 'react-native'
import { RegisterFormComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

const RegisterPage = ({ navigation }) => {

    const contextValues = () => {
        return {
            navigation
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <RegisterFormComponent />
            </View>
        </ContextProvider>
    )
}

export default RegisterPage
