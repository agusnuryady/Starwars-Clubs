import React, { memo, useState } from 'react'
import { ActivityIndicator, Alert, Image, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'

import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'
import PersistActions from '../redux/PersistRedux'

const RegisterFormComponent = () => {
    const dispatch = useDispatch()
    const persistState = useSelector(state => state.persist)
    const [photoUri, setPhotoUri] = useState('')
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')

    const takeProfilepic = async () => {
        const result = await launchCamera({mediaType: 'photo', cameraType: 'front'})
        if (result.assets) setPhotoUri(result?.assets[0]?.uri)
    }

    const registerValidation = () => {
        if (!email) {
            Alert.alert(WORDS.EMPTY_EMAIL)
        } else if (!fullname) {
            Alert.alert(WORDS.FULLNAME_EMPTY)
        } else if (!password) {
            Alert.alert(WORDS.PASSWORD_EMPTY)
        } else if (!email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            Alert.alert(WORDS.EMAIL_INVALID)
        } else if (!photoUri) {
            Alert.alert(WORDS.PROFILEPIC_EMPTY)
        } else {
            const data = {
                email,
                fullname,
                password,
                profile_pic: photoUri
            }
            dispatch(PersistActions.registerRequest(data))
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.wrapPic}
                onPress={takeProfilepic}
            >
                <Image 
                    source={photoUri ? {uri: photoUri} : require('../assets/icons/cameraIcon.webp')} 
                    style={photoUri ? styles.cameraImage : styles.cameraIcon} />
            </TouchableOpacity>
            <TextInput
                value={email}
                onChangeText={value => setEmail(value)}
                autoFocus
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder={WORDS.EMAIL} 
                placeholderTextColor={colors.placeholder} 
                style={[styles.inputWrap, globalStyles.normalText]}
            />
            <TextInput
                value={fullname}
                onChangeText={value => setFullname(value)}
                placeholder={WORDS.FULL_NAME} 
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
                disabled={persistState.fetchingUser}
                onPress={registerValidation}
                style={styles.registerBtn}
            >
                {persistState.fetchingUser ? (
                    <ActivityIndicator />
                ): (
                    <Text style={[globalStyles.normalText, {color: colors.primary}]}>{WORDS.REGISTER}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default WithContext(memo(RegisterFormComponent))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 64
    },
    wrapPic: {
        width: 200,
        height: 200,
        backgroundColor: colors.secondary,
        borderRadius: 200/2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        overflow: 'hidden'
    },
    cameraIcon: {
        width: 40,
        height: 40
    },
    cameraImage: {
        width: 200,
        height: 200
    },
    inputWrap: {
        width: '100%',
        borderBottomColor: colors.text,
        borderBottomWidth: 1.5,
        paddingHorizontal: 0,
        paddingVertical: 4,
        marginVertical: 8
    },
    registerBtn: {
        width: '100%',
        padding: 8,
        alignItems: 'center',
        backgroundColor: colors.text,
        borderRadius: 5,
        marginTop: 16
    }
})
