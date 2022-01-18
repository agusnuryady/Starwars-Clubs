import React, { memo, useCallback, useMemo } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AllianceActions from '../redux/AllianceRedux'
import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const AllianceListComponent = ({navigation,modalVisible,setModalVisible}) => {
    const dispatch = useDispatch()
    const allianceState = useSelector(state => state.alliance)
    const persistState = useSelector(state => state.persist)
    const alliances = useMemo(() => {
        const myTroop = allianceState.troops.filter(item => item.email === persistState.authUser.email)
        if (myTroop.length === 0) return []
        const myAlliance = allianceState.alliances.filter(itema => myTroop?.some(itemb => itemb.alliance === itema.name))
        return myAlliance
    }, [allianceState, persistState])

    const acceptHandle = useCallback(
        (item) => {
            const data = {
                ...persistState.authUser,
                alliance: item.name,
                status: 'active'
            }
            dispatch(AllianceActions.acceptRequest(data))
        },
        [persistState],
    )

    const declineHandle = useCallback(
        (item) => {
            const data = {
                ...persistState.authUser,
                alliance: item.name,
            }
            dispatch(AllianceActions.declineRequest(data))
        },
        [persistState],
    )

    const groupItem = ({item, index}) => {
        const troopsNumber = allianceState.troops.filter(itemT => itemT.alliance === item.name && itemT.status === 'active').length
        const troops = allianceState.troops.filter(itemT => itemT.alliance === item.name && itemT.email === persistState.authUser.email)

        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.allianceItem}
                onPress={() => navigation.navigate('GroupDetail', { item })}
            >
                <View style={styles.shipWrap}>
                    <Image source={require('../assets/images/ship_alliance.png')} style={styles.shipImage}/>
                </View>
                <View style={styles.infoWrap}>
                    <Text numberOfLines={1} style={[globalStyles.normalText, styles.nameAlliance]}>{item.name}</Text>
                    <Text numberOfLines={1} style={globalStyles.descText}>{WORDS.TROOPERS}: {troopsNumber}</Text>
                </View>
                {troops[0].status === 'requested' && (
                    <View style={styles.wrapOpt}>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.acceptBtn}
                            onPress={() => acceptHandle(item)}
                        >
                            <Text style={globalStyles.descText}>{WORDS.ACCEPT}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.declinetBtn}
                            onPress={() => declineHandle(item)}
                        >
                            <Text style={globalStyles.descText}>{WORDS.DECLINE}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapAlliance}>
                <Image source={require('../assets/images/alliance.jpg')} style={styles.tropIcon} />
                <Text style={[globalStyles.titleText]}>{WORDS.YOUR_ALLIANCE}</Text>
            </View>
            <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.createAllianceBtn}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Image source={require('../assets/icons/createIcon.webp')} style={styles.createAllianceIcon} />
            </TouchableOpacity>
            <FlatList
                data={alliances}
                keyExtractor={(item, index) => `group ${index}`}
                renderItem={groupItem}
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

export default WithContext(memo(AllianceListComponent))

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
    createAllianceBtn: {
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
    createAllianceIcon: {
        width: 30,
        height: 30
    },
    allianceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 16
    },
    shipWrap: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: colors.darkPrimary
    },
    shipImage: {
        width: 50,
        height: 40
    },
    infoWrap: {
        paddingLeft: 16,
        flex: 1
    },
    nameAlliance: {
        paddingBottom: 8,
        borderBottomColor: colors.text,
        borderBottomWidth: 1.5,
        width: '100%',
        marginBottom: 8,
        flexShrink: 1
    },
    emptyWrap: {
        width:'100%',
        height: Dimensions.get('window').height * 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    epmtyIcon: {
        width: 50,
        height: 50,
        marginBottom: 16
    },
    wrapOpt: {
        paddingLeft: 8,
        alignItems: 'center'
    },
    acceptBtn: {
        width: 70,
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: colors.darkSuccess,
        marginVertical: 4
    },
    declinetBtn: {
        width:70,
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: colors.textSecondary,
        marginVertical: 4
    }
})
