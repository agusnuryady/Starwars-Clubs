import React, { memo } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colors } from '../configs'
import { WithContext } from '../context/CustomContext'
import globalStyles from '../styles'

const ShipDetailComponent = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapAlliance}>
                <Image source={require('../assets/images/alliance.jpg')} style={styles.flagImage}/>
                <Text numberOfLines={1} style={[globalStyles.titleText, styles.allianceText]}>{item.name}</Text>
                <Image source={require('../assets/images/alliance.jpg')} style={styles.flagImage}/>
            </View>
            <Image source={require('../assets/images/ship_alliance.png')} style={styles.shipImage}/>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            >
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Starship Name:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.name}</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Model:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.model}</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Starship Class:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.starship_class}</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Manufacturer:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.manufacturer}</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Length:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.length} m</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Cargo Capacity:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.cargo_capacity} kg</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Crew:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.crew}</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Passengers:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.passengers}</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Consumables:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.consumables}</Text>
                </View>
                <View style={styles.itemWrap}>
                    <Text style={globalStyles.descText}>Cost In Credits:</Text>
                    <Text numberOfLines={2} style={[globalStyles.normalText, {textAlign: 'center'}]}>{item.properties.cost_in_credits}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default WithContext(memo(ShipDetailComponent))

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    wrapAlliance: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flagImage: {
        width: 35,
        height: 35
    },
    allianceText: {
        alignSelf: 'center',
        paddingBottom: 2,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.text,
        marginVertical: 16,
        marginHorizontal: 8
    },
    shipImage: {
        width: 250,
        height: 150,
        marginVertical: 8,
        alignSelf: 'center'
    },
    itemWrap: {
        width: Dimensions.get('window').width * 0.5 - 16,
        height: Dimensions.get('window').width * 0.2,
        backgroundColor: colors.darkPrimary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        margin: 8
    }
})
