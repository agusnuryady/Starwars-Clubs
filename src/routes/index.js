import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthPage from '../containers/AuthPage'
import BotomTab from './BotomTab'
import LoginPage from '../containers/LoginPage'
import RegisterPage from '../containers/RegisterPage'
import GroupDetailPage from '../containers/GroupDetailPage'
import ProfilePage from '../containers/ProfilePage'
import TroopsPage from '../containers/TroopsPage'
import { navigationRef } from '../services/RootNavigation';

const { Navigator, Screen } = createNativeStackNavigator();

const StackNavigator = () => (
    <Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Screen name='Auth' component={AuthPage} />
        <Screen name="Login" component={LoginPage} />
        <Screen name="Register" component={RegisterPage} />
        <Screen name="Home" component={BotomTab} />
        <Screen name='GroupDetail' component={GroupDetailPage} />
        <Screen name='Profile' component={ProfilePage} />
        <Screen name='Troops' component={TroopsPage} />
    </Navigator>
)

const App = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <StackNavigator />
        </NavigationContainer>
    )
}

export default App;