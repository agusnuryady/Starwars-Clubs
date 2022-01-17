import React, { memo } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../configs'

import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const ProfileStatusComponent = ({ navigation,item,isLogout, modalVisible, setModalVisible }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapAlliance}>
                <Image source={require('../assets/images/alliance.jpg')} style={styles.tropIcon} />
                <Text style={[globalStyles.titleText]}>{WORDS.PROFILE_STATUS}</Text>
            </View>
            <Text style={[globalStyles.bigText, {marginHorizontal: 16, marginBottom: 8}]}>{item?.fullname}</Text>
            <View style={styles.wrapInfo}>
                <Image 
                    style={styles.profilImage} 
                    source={{uri: item?.profile_pic}} 
                    resizeMode='cover' 
                />
                <View style={styles.infoItem}>
                    <Text style={[globalStyles.normalText, styles.infoText]}>Birth Year: {item?.properties?.birth_year}</Text>
                    <Text style={[globalStyles.normalText, styles.infoText]}>Height: {item?.properties?.height} cm</Text>
                    <Text style={[globalStyles.normalText, styles.infoText]}>Mass: {item?.properties?.mass} kg</Text>
                    <Text style={[globalStyles.normalText, styles.infoText]}>Hair Color: {item?.properties?.hair_color}</Text>
                    <Text style={[globalStyles.normalText, styles.infoText]}>Eye Color: {item?.properties?.eye_color}</Text>
                    <Text style={[globalStyles.normalText, styles.infoText]}>Gender: {item?.properties?.gender}</Text>
                </View>
            </View>
            <View style={styles.infoItem}>
                <Text style={[globalStyles.normalText, styles.descText]}>Description</Text>
                <Text style={globalStyles.normalText}>{item?.description}</Text>
            </View>
            {isLogout && (
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.logoutBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Image source={require('../assets/icons/logoutIcon.webp')} style={styles.logoutIcon} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default WithContext(memo(ProfileStatusComponent))

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapAlliance: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        paddingBottom: 16,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.text,
    },
    tropIcon: {
        width: 40,
        height: 40,
        borderRadius: 50/2,
        marginRight: 8,
    },
    wrapInfo: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
    },
    profilImage: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.6,
        backgroundColor: colors.secondary
    },
    infoItem: {
        flex: 1,
        paddingHorizontal: 16
    },
    infoText: {
        paddingBottom: 4, 
        borderBottomWidth: 1.5, 
        borderBottomColor: colors.text,
        marginBottom: 16
    },
    descText: {
        paddingVertical: 8,
        borderBottomColor: colors.text,
        borderBottomWidth: 1.5,
        marginBottom: 8
    },
    logoutBtn: {
        position: 'absolute',
        bottom: 80,
        right: 16,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60/2,
        zIndex: 99,
        backgroundColor: colors.darkPrimary
    },
    logoutIcon: {
        width: 30,
        height: 30
    },
})
