import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from 'react-native-radio-buttons-group';

import { translate } from '../services/translationsService';

const BALANCED_WEIGHTS_VALUE = 1;
const TIPS_WEIGHTS_VALUE = 2;
const CASH_WEIGHTS_VALUE = 3;

const BALANCED_WEIGHTS = {
    cash: 100,
    tips: 100
};

const TIPS_WEIGHTS = {
    cash: 50,
    tips: 100
};

const CASH_WEIGHTS = {
    cash: 100,
    tips: 50
};

export class ResultsSortingSettings extends React.Component {
    static propTypes = {
        strategyWeights: PropTypes.object,
        onValueChange: PropTypes.func
    };

    static defaultProps = {
        onValueChange: () => {},
        strategyWeights: BALANCED_WEIGHTS
    };

    constructor(props) {
        super(props);

        const selectedValue = this.resolveSelectedValue(this.props.strategyWeights);
        this.state = {
            radioButtons: [{
                label: translate('settings.sortingStrategy.balanced'),
                value: BALANCED_WEIGHTS_VALUE,
                selected: selectedValue === BALANCED_WEIGHTS_VALUE
            }, {
                label: translate('settings.sortingStrategy.tips'),
                value: TIPS_WEIGHTS_VALUE,
                selected: selectedValue === TIPS_WEIGHTS_VALUE
            }, {
                label: translate('settings.sortingStrategy.cash'),
                value: CASH_WEIGHTS_VALUE,
                selected: selectedValue === CASH_WEIGHTS_VALUE
            }]
        };
    }

    resolveSelectedValue(weights) {
        if (weights.cash < weights.tips) {
            return TIPS_WEIGHTS_VALUE;
        } else if (weights.cash > weights.tips) {
            return CASH_WEIGHTS_VALUE;
        }
        return BALANCED_WEIGHTS_VALUE;
    }

    resolveWeights(selectedValue) {
        switch (selectedValue) {
            case TIPS_WEIGHTS_VALUE:
                return TIPS_WEIGHTS;
            case CASH_WEIGHTS_VALUE:
                return CASH_WEIGHTS;
            case BALANCED_WEIGHTS_VALUE:
            default:
                return BALANCED_WEIGHTS;
        }
    }

    onPress = (radioButtons) => {
        this.setState({ radioButtons });

        const selectedButton = radioButtons.find(item => item.selected === true);
        this.props.onValueChange(this.resolveWeights(selectedButton.value));
    };

    render() {
        return (<RadioGroup radioButtons={this.state.radioButtons} onPress={this.onPress} />);
    }
}
