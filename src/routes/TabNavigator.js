import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { colors } from '../configs';

const TabNavigator = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={`tab item ${index}`}
                        activeOpacity={0.5}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBtn}
                    >
                        {route.name === 'Explore' ? (
                            <Image 
                                source={isFocused ? require('../assets/icons/explore_2_icon.webp') : require('../assets/icons/explore_1_icon.webp')} 
                                style={styles.iconImage}
                                resizeMode='contain'
                            />
                        ):
                        (
                            <Image 
                                source={isFocused ? require('../assets/icons/profile_2_icon.webp') : require('../assets/icons/profile_1_icon.webp')} 
                                style={styles.iconImage}
                                resizeMode='contain'
                            />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabNavigator

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkPrimary,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.8,
        alignSelf: 'center',
        marginBottom: 16,
        borderRadius: 40,
        position: 'absolute',
        bottom: 0
    },
    tabBtn: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImage: {
        width: 20,
        height: 20
    }
})