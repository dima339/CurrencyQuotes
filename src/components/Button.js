import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

export const Button = (props) => {

    const {title, style, onPress} = props

    return  <TouchableOpacity {...{
        style: [styles.button, style],
        onPress
    }}>
        <Text {...{style: styles.textButton}}>
            {title}
        </Text>
    </TouchableOpacity>
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: '#70c1b3',
        height: 50,
        width: '70%',
        marginHorizontal: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 16
    }
})

