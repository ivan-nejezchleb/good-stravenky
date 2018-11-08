import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';

import { CalculationResultSmall } from './CalculationResultSmall';
import { translate } from '../services/translationsService';

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        borderColor: 'green',
        borderStyle: 'solid',
        borderWidth: 2
    }
});

export class CalculationResultsList extends React.Component {
    render() {
        const {items} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                { items.length ? <Text>{translate('main.paymentVariantsHeader')}</Text> : null}
                {items.map(item => (
                    <CalculationResultSmall key={JSON.stringify(item.combination)} item={item} />
                ))}
            </ScrollView>
        );
    }
}
