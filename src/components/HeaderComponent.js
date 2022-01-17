import React, { memo } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, fonts } from '../configs'
import { WithContext } from '../context/CustomContext'

const HeaderComponent = ({navigation, back=false}) => {
    return (
        <View style={styles.container}>
            {back && (
                <TouchableOpacity 
                    activeOpacity={0.5}
                    style={styles.backWrap}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../assets/icons/backIcon.webp')} style={styles.backIcon} />
                </TouchableOpacity>
            )}
            <Image source={require('../assets/images/star_wars_logo.png')} style={styles.logoImage} />
        </View>
    )
}

export default WithContext(memo(HeaderComponent)) 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: colors.darkPrimary,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoImage: {
        width: 70,
        height: 30
    },
    backWrap: {
        position: 'absolute',
        left: 16,
    },
    backIcon: {
        width: 20,
        height: 20,
        marginRight: 16
    }
})
