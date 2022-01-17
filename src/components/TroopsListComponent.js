import React, { memo, useMemo } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const TroopsListComponent = ({navigation, item}) => {
    const allianceState = useSelector(state => state.alliance)
    const persistState = useSelector(state => state.persist)

    const troops = useMemo(() => {
        return allianceState.troops.filter(itemT => itemT.alliance === item.name)
    }, [allianceState])

    const troopsItem = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.troopsItem}
                onPress={() => navigation.navigate('Profile')}
            >
                <View style={styles.itemRight}>
                    <Image source={require('../assets/images/troop_ship.png')} style={styles.shipImage} />
                    <Text style={globalStyles.normalText}>{item.fullname === persistState.authUser.fullname ? 'You' : item.fullname}</Text>
                </View>
                <Text 
                    style={[globalStyles.descText, styles.locationText]}
                    onPress={() => {}}
                >
                    {`-6.989839\n103.03423`}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={[globalStyles.subTitleText, {alignSelf: 'center'}]}>Fleet Troop</Text>
            <View style={styles.wrapTabTable}>
                <Text style={globalStyles.normalText}>Name</Text>
                <Text style={globalStyles.normalText}>Position</Text>
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
            <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.addWrap}
                onPress={() => navigation.navigate('Troops')}
            >
                <Text style={[globalStyles.normalText, {color: colors.primary}]}>Recruit Troops</Text>
            </TouchableOpacity>
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
