import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Currency from './../screens/Currency'
import {Start} from './../screens/Start'


const RootNavigator = createStackNavigator({
    Start,
    Currency
})

const Root = createAppContainer(RootNavigator)

export default Root
