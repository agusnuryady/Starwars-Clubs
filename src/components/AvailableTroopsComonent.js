import React, { memo } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import AllianceActions from '../redux/AllianceRedux'
import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const AvailableTroopsComonent = ({ navigation,persistState,allianceState, item }) => {
    const dispatch = useDispatch()
    
    const recruitTroop = (tItem) => {
        const data = {
            ...tItem,
            alliance: item.name
        }
        dispatch(AllianceActions.recruitRequest(data))
    }

    const availableTroopItem = (userItem) => {
        const statusTroop = () => {
            const troop = allianceState.troops.filter(val => val.alliance === item.name && val.status !== 'active' && val.email === userItem.item.email)
            if (troop.length === 0) return false
            return true
        }

        return (
            <TouchableOpacity 
                activeOpacity={0.5}
                style={styles.wrapItem}
                onPress={() => navigation.navigate('Profile', { item: userItem.item })}
            >
                <View style={styles.rightItem}>
                    <Image style={styles.profileImage} source={{uri:userItem.item.profile_pic}} />
                    <View>
                        <Text style={globalStyles.normalText}>{userItem.item.fullname}</Text>
                        <Text style={[globalStyles.descText, {marginTop: 4}]}>{WORDS.GENDER}: {userItem.item.properties.gender}</Text>
                    </View>
                </View>
                {statusTroop() ? (
                    <Text style={globalStyles.normalText}>{WORDS.REQUESTED}</Text>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.statusBtn}
                        onPress={() => recruitTroop(userItem.item)}
                    >
                        <Text style={[globalStyles.descText, {color: colors.primary}]}>{WORDS.RECRUIT}</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapTitle}>
                <Text style={globalStyles.titleText}>Available Troops</Text>
            </View>
            <FlatList
                data={persistState.users?.filter(uItem => uItem.email !== persistState.authUser?.email && !allianceState.troops?.some(itemb => itemb.alliance === item.name && itemb.email === uItem.email && itemb.status === 'active'))}
                keyExtractor={(item, index) => `available troop ${index}`}
                renderItem={(userItem, index) => availableTroopItem(userItem, index)}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Image source={require('../assets/images/vader.png')} style={styles.epmtyIcon} />
                        <Text style={globalStyles.descText}>{WORDS.YOURE_ALLONE}</Text>
                    </View>
                }
            />
        </View>
    )
}

export default WithContext(memo(AvailableTroopsComonent))

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapTitle: {
        paddingVertical: 16,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.text
    },
    wrapItem: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16
    },
    profileImage: {
        width: 50, 
        height: 50,
        borderRadius: 50/2,
        backgroundColor: colors.darkPrimary,
        marginRight: 16
    },
    statusBtn: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: colors.text
    },
    emptyWrap: {
        width:'100%',
        height: Dimensions.get('window').height * 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    epmtyIcon: {
        width: 50,
        height: 50,
        marginBottom: 16
    }
})
