import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import { ReduxPersistConfig } from '../configs'
import rootSaga from '../sagas'

/* ------------- Redux Component ------------- */
import { reducer as persistRedux } from './PersistRedux'
import { reducer as allianceRedux } from './AllianceRedux'

/* ------------- Assemble The Reducers ------------- */
export const reducer = combineReducers({
    persist: persistRedux,
    alliance: allianceRedux
})

/* ------------- Create The Saga middleware ------------- */
const middleware = []
const sagaMonitor = null

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
middleware.push(sagaMiddleware)

/* ------------- Logger Middleware ------------- */
if (__DEV__) {
    middleware.push(logger)
}

  /* ------------- Assemble Middleware ------------- */
const persistedReducer = persistReducer(ReduxPersistConfig, reducer)

const store = createStore(persistedReducer, applyMiddleware(...middleware))
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga)

/* ------------- Hot Module Reloading Redux ------------- */
if (module.hot) {
    module.hot.accept(() => {
        const nextRootReducer = require('./').reducer
        store.replaceReducer(nextRootReducer)
    
        const newYieldedSagas = require('../sagas').default
        sagaMiddleware.run(rootSaga).cancel()
        sagaMiddleware.run(rootSaga).done.then(() => {
            sagaMiddleware.run(newYieldedSagas)
        })
    })
}
/* ------------- End ------------- */

export { store, persistor }