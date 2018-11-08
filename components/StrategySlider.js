import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Slider,
    StyleSheet,
    Text
} from 'react-native';

import {
    translate
} from '../services/translationsService';

const styles = StyleSheet.create({
    labelsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    labelLeft: {
        alignItems: "flex-start"
    },
    labelRight: {
        alignItems: "flex-end"
    },
    thumbStyle: {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(150, 150, 150, 0.3)',
        borderColor: 'rgba(150, 150, 150, 0.6)',
        borderWidth: 14,
        borderRadius: 15
    }
});

export class StrategySlider extends React.Component {
    static propTypes = {
        strategyWeights: PropTypes.object,
        onValueChange: PropTypes.func
    };

    static defaultProps = {
        onValueChange: () => {},
        strategyWeights: {
            cash: 100,
            tips: 100
        }
    };

    constructor(props) {
        super(props);
        let value = 1;
        if (this.props.strategyWeights.cash < this.props.strategyWeights.tips) {
            value = 0;
        } else if (this.props.strategyWeights.cash > this.props.strategyWeights.tips) {
            value = 2;
        }
        this.state = {
            value
        };

        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(value) {
        this.setState({
            value
        });
        let newWeights = {
            cash: 100,
            tips: 100
        }
        if (value === 0) {
            newWeights = {
                cash: 50,
                tips: 100
            }
        } else if (value === 2) {
            newWeights = {
                cash: 100,
                tips: 50
            }
        }
        this.props.onValueChange(newWeights);
    }

    render() {
        const {
            value
        } = this.state;
        return (
            <View>
                <View style={styles.labelsContainer}>
                    <Text style={styles.labelLeft}>{translate('slider.cash')}</Text>
                    <Text style={styles.labelRight}>{translate('slider.tips')}</Text>
                </View>
                <Slider
                    value={value}
                    minimumValue={0}
                    maximumValue={2}
                    step={1}
                    onValueChange={this.onValueChange}
                    thumbTintColor="#279AF1"
                    minimumTrackTintColor = 'transparent'
                    maximumTrackTintColor = 'transparent'
                />
            </View>

        );
    }
}
