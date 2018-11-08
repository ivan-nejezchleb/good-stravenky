import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { translate } from '../services/translationsService';
import { getCombinationValue } from '../services/calculationService';

const styles = StyleSheet.create({
    item: {
        padding: 20,
        // borderBottomWidth: 2,
        borderStyle: 'dashed',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    count: {
        fontSize: 20,
        color: '#778491',
        fontWeight: 'bold'
    },
    total: {
        fontSize: 20,
        color: '#778491',
        fontWeight: 'bold'
    },
    cash: {
        fontSize: 20,
        color: '#FF595E',
        fontWeight: 'bold'
    },
    tips: {
        fontSize: 20,
        color: '#8ACB88',
        fontWeight: 'bold'
    }
});

export class CalculationResultSmall extends React.Component {
    render() {
        const {
            item
        } = this.props;

        return (
            <View style={styles.item}>

                {item.combination
                    .map(part => (
                        <View key={`${part.count} * ${part.value}`}>
                            <Text style={styles.count}>{part.count}x</Text>
                            <Text>{part.value}</Text>
                        </View>
                    ))
                }
                <View>
                    <Text style={styles.cash}>{item.cash}</Text>
                    <Text>{translate('main.additionalCashLabel')}</Text>
                </View>
                <View>
                    <Text style={styles.tips}>{item.tips}</Text>
                    <Text>{translate('main.tipLabel')}</Text>
                </View>
                <View>
                    <Text style={styles.total}>{getCombinationValue(item.combination) + item.cash}</Text>
                    <Text>{translate('main.totalPriceLabel')}</Text>
                </View>
            </View>
        );
    }
}
