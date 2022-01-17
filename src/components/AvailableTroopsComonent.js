import React, { memo } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const AvailableTroopsComonent = ({navigation}) => {
    
    const availableTroopItem = ({item, index}) => {
        return (
            <TouchableOpacity 
                activeOpacity={0.5}
                style={styles.wrapItem}
                onPress={() => navigation.navigate('Profile')}
            >
                <View style={styles.rightItem}>
                    <Image style={styles.profileImage} />
                    <View>
                        <Text style={globalStyles.normalText}>Lucal Skywalker</Text>
                        <Text style={[globalStyles.descText, {marginTop: 4}]}>Age: 27</Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.statusBtn}
                >
                    <Text style={[globalStyles.descText, {color: colors.primary}]}>Recruit</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapTitle}>
                <Text style={globalStyles.titleText}>Available Troops</Text>
            </View>
            <FlatList
                data={[1,2,3]}
                keyExtractor={(item, index) => `available troop ${index}`}
                renderItem={availableTroopItem}
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
