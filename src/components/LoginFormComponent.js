import React, { memo, useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'
import PersistActions from '../redux/PersistRedux'

const LoginFormComponent = ({ navigation }) => {
    const dispatch = useDispatch()
    const persistState = useSelector(state => state.persist)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginValidation = () => {
        if (!email) {
            Alert.alert(WORDS.EMPTY_EMAIL)
        } else if (!password) {
            Alert.alert(WORDS.PASSWORD_EMPTY)
        } else {
            const data = {
                email,
                password,
            }
            dispatch(PersistActions.loginRequest(data))
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/trops_helm.png')} style={styles.helmImage} />
            <TextInput 
                value={email}
                onChangeText={value => setEmail(value)}
                autoFocus
                keyboardType='email-address'
                autoCapitalize='none'
                placeholder={WORDS.EMAIL} 
                placeholderTextColor={colors.placeholder} 
                style={[styles.inputWrap, globalStyles.normalText]}
            />
            <TextInput
                value={password}
                onChangeText={value => setPassword(value)}
                placeholder={WORDS.PASSWORD} 
                placeholderTextColor={colors.placeholder} 
                secureTextEntry
                style={[styles.inputWrap, globalStyles.normalText]}
            />
            <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.loginBtn}
                onPress={loginValidation}
            >
                {persistState.fetchingAuth ? (
                    <ActivityIndicator/>
                ) : (
                    <Text style={[globalStyles.normalText, {color: colors.primary}]}>{WORDS.LOGIN}</Text>
                )}
            </TouchableOpacity>
            <Text style={[globalStyles.normalText, {marginTop: 8}]}>
                {WORDS.DOSNT_HAVE_ACCOUNT}
                <Text
                    onPress={() => navigation.navigate('Register')}
                    style={[globalStyles.normalText, styles.signUpText]}
                >
                    {WORDS.SIGN_UP_HERE}
                </Text>
            </Text>
        </View>
    )
}

export default WithContext(memo(LoginFormComponent))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 64
    },
    helmImage: {
        width: 70,
        height: 70,
        marginBottom: 8
    },
    inputWrap: {
        width: '100%',
        borderBottomColor: colors.text,
        borderBottomWidth: 1.5,
        paddingHorizontal: 0,
        paddingVertical: 4,
        marginVertical: 8
    },
    loginBtn: {
        width: '100%',
        padding: 8,
        alignItems: 'center',
        backgroundColor: colors.text,
        borderRadius: 5,
        marginTop: 16
    },
    signUpText: {
        textDecorationLine: 'underline',
        color: colors.textSecondary,
        marginTop: 8
    }
})
