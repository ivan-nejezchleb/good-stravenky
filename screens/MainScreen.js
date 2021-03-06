import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, View } from 'react-native';

import { calculateResults } from '../services/calculationService';
import { CalculationResultsList } from '../components/CalculationResultsList';

import { SettingsContext } from '../context/settingsContext';
import Utils from '../utils/utils';
import { translate } from '../services/translationsService';

function sortVouchers(mealVouchers) {
    return mealVouchers.map(voucher => ({
        ...voucher,
        value: parseFloat(voucher.value)
    })).sort((a, b) => a.value < b.value);
}

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            calculationResults: [],
            calculating: false
        };

        this.setResult = this.setResult.bind(this);

        this.onValueChange = this.onValueChange.bind(this);
        this.onValueConfirmed = this.onValueConfirmed.bind(this);
        this.onStrategyChange = this.onStrategyChange.bind(this);
    }

    onValueChange(value) {
        this.setState({
            value
        });
    }

    onValueConfirmed() {
        const {
            value
        } = this.state;
        if (!Utils.isValidMealVoucherValue(value)) {
            this.setState({
                value: ''
            });
            return; // TODO some error should be shown to the user, not just delete entered value silently
        }

        this.setState({
            calculating: true
        }, () => {
            const calculationResults = calculateResults(value, sortVouchers(this.props.mealVouchers));
            setTimeout(() => {
                this.setResult(calculationResults);
            }, 1);
        });
    }

    onStrategyChange(newValue) {
        this.setState({
            strategyWeights: newValue,
            calculating: true
        }, () => {
            const calculationResults = calculateResults(
                this.state.value,
                sortVouchers(this.props.mealVouchers),
                newValue
            );
            setTimeout(() => {
                this.setResult(calculationResults);
            }, 1);
        });
    }

    setResult(calculationResults) {
        this.setState({
            calculating: false,
            calculationResults
        });
    }

    renderResultsList() {
        const {
            calculationResults
        } = this.state;

        return (<CalculationResultsList items={calculationResults} />);
    }

    renderResults() {
        const {
            calculating
        } = this.state;
        if (calculating) {
            return (<Text>Kalkulujuuuuu</Text>);
        }
        return this.renderResultsList();
    }

    render() {
        const {
            value
        } = this.state;
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.topPanel}>
                    <View style={styles.topStatusBar}>
                        <TouchableOpacity
                            onPress={() => navigate('Settings')}
                            style={styles.settingsButtonWrapper}
                            activeOpacity={0.8}
                        >
                            <Image source={require('./img/config.png')} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.valueInput}
                        onSubmitEditing={this.onValueConfirmed}
                        onChangeText={this.onValueChange}
                        value={value}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        placeholder={translate('main.lunchPriceValuePlaceholder')}
                        placeholderTextColor="#E2E7EC"
                        autoFocus={true}
                    />
                </View>
                {this.renderResults()}
            </KeyboardAvoidingView>
        );
    }
}

export class MainScreenConsumer extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <SettingsContext.Consumer>
                {({ settings }) => (
                    <MainScreen
                        {...this.props}
                        mealVouchers={settings.mealVouchers}
                        strategyWeights={settings.strategyWeights}
                    />
                )}
            </SettingsContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    topPanel: {
        borderBottomWidth: 2,
        borderColor: '#CAD4DE',
        backgroundColor: '#F9FAFB'
    },
    topStatusBar: {
        alignItems: 'flex-end',
        paddingTop: 20
    },
    settingsButtonWrapper: {
        padding: 15
    },
    valueInput: {
        height: 50,
        textAlign: 'right',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#778491',
        borderWidth: 0,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 30
    }
});
