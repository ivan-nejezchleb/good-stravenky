import React from 'react';
import {
    Text,
    View
} from 'react-native';

export class CalculationResultSmall extends React.Component {
    render() {
        const {
            item
        } = this.props;

        return (
            <View>
                <Text>
                {item.combination
                    .map(part => (
                        <Text key={`${part.count} * ${part.value}`}>
                            {`${part.count} * ${part.value}`}
                        </Text>
                    ))} - {item.cash} : {item.tips}
                </Text>
            </View>
        );
    }
}
