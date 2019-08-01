import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {Button} from './../components/Button'

const photo = '../img/1.png'

export class Start extends Component {

    static navigationOptions = {
        title: 'Котировки валют',
    }

    handlePress = () => {
        this.props.navigation.navigate('Currency')
    }

    render() {
        return (
            <View {...{style: styles.container}}>
                <Text {...{style: styles.title}}>Добрый день!</Text>
                <Text {...{style: styles.description}}>Для начала работы нажмите кнопку Загрузить котировки</Text>
                <View {...{style: styles.imageView}}>
                    <Image {...{source: require(photo), style: styles.image}}/>
                </View>
                <Button {...{
                    style: {marginTop: 12} ,
                    title: 'Загрузить котировки',
                    onPress: this.handlePress
                }}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 24,
        marginBottom: 12
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageView: {
        width: 224,
        height: 224,
        marginBottom: 12
    },
    description: {
        fontSize: 18,
        marginBottom: 12,
        color: '#8e8e8e',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#70c1b3',
        marginTop: 12
    }

})
