import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { colors } from './src/configs'

import { store, persistor } from './/src/redux'
import AppNavigation from './src/routes'

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