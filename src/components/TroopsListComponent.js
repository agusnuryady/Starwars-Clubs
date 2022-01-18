import React, { memo, useMemo } from 'react'
import { Dimensions, FlatList, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const TroopsListComponent = ({navigation, item}) => {
    const allianceState = useSelector(state => state.alliance)
    const persistState = useSelector(state => state.persist)

    const troops = useMemo(() => {
        return allianceState.troops.filter(itemT => itemT.alliance === item.name && itemT.status !== 'requested')
    }, [allianceState])

    const openMap = (item) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${item.lat},${item.long}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
    }

    const troopsItem = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                disabled={item.fullname === persistState.authUser.fullname}
                style={styles.troopsItem}
                onPress={() => navigation.navigate('Profile', { item })}
            >
                <View style={styles.itemRight}>
                    <Image source={require('../assets/images/troop_ship.png')} style={styles.shipImage} />
                    <Text style={globalStyles.normalText}>{item.fullname === persistState.authUser.fullname ? WORDS.YOU : item.fullname}</Text>
                </View>
                <Text 
                    style={[globalStyles.descText, styles.locationText]}
                    onPress={() => openMap(item)}
                >
                    <Text>{item.lat.toFixed(6)}</Text>
                    {`\n`}
                    <Text>{item.long.toFixed(6)}</Text>
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={[globalStyles.subTitleText, {alignSelf: 'center'}]}>{WORDS.FLEET_TROOP}</Text>
            <View style={styles.wrapTabTable}>
                <Text style={globalStyles.normalText}>{WORDS.NAME}</Text>
                <Text style={globalStyles.normalText}>{WORDS.POSITION}</Text>
            </View>
            <FlatList 
                data={troops}
                keyExtractor={(item, index) => `trops ${index}`}
                renderItem={troopsItem}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Image source={require('../assets/images/vader.png')} style={styles.epmtyIcon} />
                        <Text style={globalStyles.descText}>{WORDS.YOURE_ALLONE}</Text>
                    </View>
                }
            />
            {item.admin === persistState.authUser.email && (
                <TouchableOpacity 
                    activeOpacity={0.5} 
                    style={styles.addWrap}
                    onPress={() => navigation.navigate('Troops', { item })}
                >
                    <Text style={[globalStyles.normalText, {color: colors.primary}]}>{WORDS.RECRUIT_TROOPS}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default WithContext(memo(TroopsListComponent))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.darkPrimary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 8
    },
    wrapTabTable: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: colors.text,
        borderTopWidth: 1,
        borderBottomColor: colors.text,
        borderBottomWidth: 1,
        padding: 8,
        marginVertical: 8
    },
    troopsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderBottomWidth: 1,
        paddingBottom: 4,
        borderBottomColor: colors.text
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 8
    },
    shipImage: {
        width: 50,
        height: 50,
        marginRight: 16
    },
    locationText: {
        color: colors.textSecondary,
        textDecorationLine: 'underline',
        textAlign: 'right'
    },
    addWrap: {
        marginTop: 8,
        width: '100%',
        padding: 8,
        borderRadius: 5,
        backgroundColor: colors.text,
        alignItems: 'center'
    },
    emptyWrap: {
        width:'100%',
        height: Dimensions.get('window').height * 0.25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    epmtyIcon: {
        width: 50,
        height: 50,
        marginBottom: 16
    }
})
