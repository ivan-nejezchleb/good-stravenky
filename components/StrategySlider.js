import React from 'react';
import PropTypes from 'prop-types';
import {
    Slider
} from 'react-native';

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
            <Slider value={value} minimumValue={0} maximumValue={2} step={1} onValueChange={this.onValueChange} />
        );
    }
}
