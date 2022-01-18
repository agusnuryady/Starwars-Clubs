import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import PushNotification from 'react-native-push-notification';

import { colors } from './src/configs'
import { store, persistor } from './/src/redux'
import AppNavigation from './src/routes'

PushNotification.createChannel({
    channelId: "channel-id-1",
    channelName: 'Starwars Club Mobile Apps',
    channelDescription: 'Starwars Club Mobile Apps Push Channel'
})

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <StatusBar animated={true} backgroundColor={colors.darkPrimary} barStyle='light-content' />
                <AppNavigation/>
            </PersistGate>
        </Provider>
    )
}

export default App