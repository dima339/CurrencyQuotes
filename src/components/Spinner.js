import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

export const Spinner = () =>
    <View style={styles.container}>
        <ActivityIndicator size='large' color='#70c1b3'/>
    </View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
