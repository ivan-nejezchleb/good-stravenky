import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { translate } from '../services/translationsService';
import { getCombinationValue } from '../services/calculationService';

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    count: {
        color: '#778491'
    },
    total: {
        color: '#778491'
    },
    cash: {
        color: '#FF595E'
    },
    tips: {
        color: '#8ACB88'
    },
    zero: {
        color: '#778491'
    },
    value: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description: {
        color: '#CAD6E1',
        textAlign: 'center'
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
                        <View key={`${item.key}: ${part.count} * ${part.value}`}>
                            {part.count === 0
                                ? <Text style={[styles.count, styles.value]}>-</Text>
                                : <Text style={[styles.count, styles.value]}>{part.count}x</Text>
                            }
                            <Text style={styles.description}>{part.value}</Text>
                        </View>
                    ))
                }
                <View>
                    {
                        item.cash === 0
                            ? <Text style={[styles.zero, styles.value]}>-</Text>
                            : <Text style={[styles.cash, styles.value]}>{item.cash}</Text>
                    }
                    <Text style={styles.description}>{translate('main.additionalCashLabel')}</Text>
                </View>
                <View>
                    {
                        item.tips === 0
                            ? <Text style={[styles.zero, styles.value]}>-</Text>
                            : <Text style={[styles.tips, styles.value]}>{item.tips}</Text>
                    }
                    <Text style={styles.description}>{translate('main.tipLabel')}</Text>
                </View>
                <View>
                    <Text style={[styles.total, styles.value]}>
                        {getCombinationValue(item.combination) + item.cash}
                    </Text>
                    <Text style={styles.description}>{translate('main.totalPriceLabel')}</Text>
                </View>
            </View>
        );
    }
}
