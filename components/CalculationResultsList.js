import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';

import { CalculationResultSmall } from './CalculationResultSmall';
import { translate } from '../services/translationsService';

const styles = StyleSheet.create({
    container: {

    },
    contentContainer: {
        paddingVertical: 20
    },
    variantsPanel: {
        padding: 30
    },
    variantTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#778491'
    },
    variantIcons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingTop: 10
    }
});

export class CalculationResultsList extends React.Component {
    render() {
        const { items } = this.props;
        return (
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                    {items.length ? (
                        <View style={styles.variantsPanel}>
                            <Text style={styles.variantTitle}>{translate('main.paymentVariantsHeader')}</Text>
                            <View style={styles.variantIcons}>
                                <Image style={styles.variantIcon} source={require('./img/meal-vouchers.png')} />
                                <Image style={styles.variantIcon} source={require('./img/coins.png')} />
                                <Image style={styles.variantIcon} source={require('./img/tip.png')} />
                                <Image style={styles.variantIcon} source={require('./img/sum.png')} />
                            </View>
                        </View>
                    ) : null}
                    {items.map(item => (
                        <CalculationResultSmall key={JSON.stringify(item.combination)} item={item} />
                    ))}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
