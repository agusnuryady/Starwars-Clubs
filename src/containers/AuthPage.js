import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AuthPage = ({ navigation }) => {
    const persistState = useSelector(state => state.persist)

    useEffect(() => {
        if (persistState.authUser !== null) {
            navigation.reset({
                index: 0,
                routes: [{name:'Home'}]
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{name:'Login'}]
            });
        }
    }, [])

    return true
}

export default AuthPage
