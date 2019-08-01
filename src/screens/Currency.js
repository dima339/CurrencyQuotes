import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList, PixelRatio, ScrollView} from 'react-native'
import {Button} from './../components/Button'
import {Spinner} from './../components/Spinner'
import lodash from 'lodash'
import moment from 'moment'
import {fetchCurrencyFromAPI} from '../actions/actions'
import {connect} from 'react-redux'

const names = require('./../assets/names.json')

class Currency extends Component {

    static navigationOptions = {
        title: 'Котировки валют'
    }

    state = {
        todayCurrency: [],
        yesterday: [],
        beforeYesterday: []
    }

    componentWillMount() {
        this.props.getCurrency()
    }

    componentWillReceiveProps(props) {

        if (!props.isFetching) {
            let rates = props.currency.currency.rates

            let dates = lodash.map(rates, (key, value) => ({
                dates: value,
                currency: lodash.map(key, (key, value) => ({
                    name: value,
                    price: key
                }))
            }))

            let todayCurrency = lodash.find(dates, {'dates': moment().subtract(1, 'days').format('YYYY-MM-DD')})

            let yesterday = lodash.find(dates, {'dates': moment().subtract(2, 'days').format('YYYY-MM-DD')}) || []

            let beforeYesterday = lodash.find(dates, {'dates': moment().subtract(3, 'days').format('YYYY-MM-DD')}) || []

            this.setState({
                todayCurrency: todayCurrency,
                yesterday,
                beforeYesterday
            })

        }
    }

    getCurrency = () =>{
        this.props.getCurrency()
    }

    nameSearch = (currency) => {
        const name = lodash.find(names, {currency: currency}).name
        return name
    }

    yesterdayPrice = (currency) => {
        if (this.state.yesterday.length !== 0) {
            const last = this.state.yesterday.currency

            const lastPrice = lodash.find(last, {name: currency}).price

            return (1 / lastPrice)
        } else {
            return null
        }
    }

    beforeYesterdayPrice = (currency) => {
        if (this.state.beforeYesterday.length !== 0) {

            const last = this.state.beforeYesterday.currency

            const lastPrice = lodash.find(last, {name: currency}).price

            return (1 / lastPrice).toFixed(2)
        } else {
            return this.yesterdayPrice(currency)
        }

    }

    minusYesterday = (name) => {
        return ((this.yesterdayPrice(name) - this.beforeYesterdayPrice(name)).toFixed(4))
    }

    render() {

        const {isFetching} = this.props.currency

        return (
            <>
                {isFetching
                    ? <Spinner/>
                    : <><ScrollView {...{style: styles.container}}>
                        <FlatList {...{
                            contentContainerStyle: styles.list,
                            renderItem: ({item}) =>
                                <View {...{style: styles.cardView}}>
                                    <View {...{style: styles.rowUp}}>
                                        <Text {...{style: styles.title}}>{this.nameSearch(item.name)}</Text>
                                        <Text {...{style: styles.description}}>{item.name}</Text>
                                    </View>
                                    <View {...{style: styles.separator}}/>
                                    <View {...{style: styles.rowDown}}>
                                        <View {...{style: styles.column}}>
                                            <Text {...{style: styles.description}}>ЦБ на сегодня</Text>
                                            <View {...{style: styles.row}}>
                                                <Text {...{style: [styles.title, {marginRight: 10}]}}>
                                                    {this.yesterdayPrice(item.name).toFixed(2)}
                                                </Text>

                                                {(this.yesterdayPrice(item.name) - this.beforeYesterdayPrice(item.name)) !== 0
                                                && <Text {...{
                                                    style: [styles.color,
                                                        this.yesterdayPrice(item.name) > this.beforeYesterdayPrice(item.name)
                                                            ? {color: 'green'}
                                                            : {color: 'red'}
                                                    ]
                                                }}>
                                                    {this.beforeYesterdayPrice(item.name) > this.yesterdayPrice(item.name) ? '' : '+'}
                                                    {this.minusYesterday(item.name)}
                                                </Text>
                                                }

                                            </View>
                                        </View>
                                        <View {...{style: styles.column}}>
                                            <Text {...{style: styles.description}}>ЦБ на завтра</Text>
                                            <View {...{style: styles.row}}>
                                                <Text{...{style: [styles.title, {marginRight: 10}]}}>{(1 / item.price).toFixed(2)}</Text>
                                                {((1 / item.price) - this.yesterdayPrice(item.name)) !== 0
                                                &&
                                                <Text {...{
                                                    style: [styles.color,
                                                        (1 / item.price) > this.yesterdayPrice(item.name)
                                                            ? {color: 'green'}
                                                            : {color: 'red'}
                                                    ]
                                                }}>
                                                    {(1 / item.price) > this.yesterdayPrice(item.name) ? '+' : ''}
                                                    {((1 / item.price) - this.yesterdayPrice(item.name)).toFixed(4)}
                                                </Text>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>,
                            data: this.state.todayCurrency.currency,
                            style: styles.color,
                            keyExtractor: (item) => item.name
                        }}/>
                    </ScrollView>
                        <View {...{style: styles.buttonView}}>
                            <Button {...{title: 'Обновить котировки', onPress: this.getCurrency}}/>
                        </View>
                    </>
                }
            </>
        )
    }

}

function mapStateToProps(state) {
    return {
        currency: state.currency
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrency: () => dispatch(fetchCurrencyFromAPI())
    }
}

export default Currency = connect(
    mapStateToProps,
    mapDispatchToProps
)(Currency)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 18
    },
    description: {
        fontSize: 14,
        color: '#8e8e8e',
        textAlign: 'center'
    },
    cardView: {
        width: '100%',
        height: 120,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#e7e7e7',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 2,
        shadowRadius: 10,
        elevation: 1,
        marginVertical: 16
    },
    rowUp: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        height: '50%',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    colorText: {
        fontSize: 12
    },
    rowDown: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingRight: '15%',
        height: '50%',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column'
    },
    separator: {
        backgroundColor: '#cfd8dc',
        height: PixelRatio.roundToNearestPixel(1)
    },
    buttonView: {
        width: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
        marginTop: '120%',
        alignItems: 'center'
    }

})
