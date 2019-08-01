import React from 'react'
import {name as appName} from './app.json'
import { Provider } from 'react-redux'
import configureStore from './src/const/configureStore'
import {AppRegistry} from 'react-native'
import {App} from './app'

const store = configureStore()

const ReduxApp = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp)

