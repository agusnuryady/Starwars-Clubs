import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'

import TabBar from './TabNavigator'
import ExplorePage from '../containers/ExplorePage'
import ProfilePage from '../containers/ProfilePage'

const { Navigator, Screen } = createBottomTabNavigator()

const BotomTab = () => {
    const persistState = useSelector(state => state.persist)

    return (
        <Navigator 
            screenOptions={{
                headerShown: false,
            }}
            tabBar={props => <TabBar {...props} />} 
        >
            <Screen name='Explore' component={ExplorePage} />
            <Screen name='Profile' initialParams={{item: persistState.authUser, isLogout: true}} component={ProfilePage} />
        </Navigator>
    )
}

export default BotomTab
