import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, ScrollView, View, Button, StyleSheet, Text } from 'react-native';

import { v4 as uuid } from 'uuid';

import { translate } from '../services/translationsService';
import SettingsService from '../services/settingsService';
import { SettingsContext } from '../context/settingsContext';

import { MealVoucherItem } from '../components/MealVoucherItem';
import { ResultsSortingSettings } from '../components/ResultsSortingSettings';
import Utils from '../utils/utils';

const MAX_SUPPORTED_VALUES = 2;

class SettingsScreen extends React.Component {
    static propTypes = {
        mealVouchers: PropTypes.array,
        strategyWeights: PropTypes.object
    };

    static defaultProps = {
        triggerSave: false,
        mealVouchers: [],
        setSettings: () => {},
        setShowWelcomeScreen: () => {},
        strategyWeights: {
            cash: 100,
            tips: 100
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            mealVouchers: [...this.props.mealVouchers],
            strategyWeights: { ...this.props.strategyWeights }
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onValueConfirmed = this.onValueConfirmed.bind(this);
        this.onStrategyChange = this.onStrategyChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.triggerSave) {
            await this.onSave();
        }
    }

    onValueChange(value) {
        this.setState({
            text: value
        });
    }

    voucherValueIsUnique(value) {
        const { mealVouchers } = this.state;
        return mealVouchers.find(voucher => voucher.value === value) === undefined;
    }

    onValueConfirmed() {
        const { text } = this.state;

        if (!Utils.isValidMealVoucherValue(text) || !this.voucherValueIsUnique(text)) {
            this.setState({
                text: ''
            });
            return; // TODO some error should be shown to the user, not just delete entered value silently
        }

        this.setState({
            text: '',
            mealVouchers: [
                ...this.state.mealVouchers,
                {
                    key: uuid(),
                    value: text
                }
            ]
        });
    }

    async onSave() {
        const { mealVouchers, strategyWeights } = this.state;

        if (mealVouchers.length === 0) {
            return; // TODO display some error to the user, do not fail silently
        }

        await SettingsService.saveSettings({ mealVouchers, strategyWeights });
        await SettingsService.toggleShowWelcomeScreen(false);
        // context sync
        this.props.setSettings({ mealVouchers, strategyWeights });
        this.props.setShowWelcomeScreen(false); // will force new navigation
    }

    async onReset() {
        await SettingsService.toggleShowWelcomeScreen(true);
        // context sync
        this.props.setShowWelcomeScreen(true);
    }

    onDelete(keyToDelete) {
        this.setState({
            mealVouchers: this.state.mealVouchers.filter(({ key }) => key !== keyToDelete)
        });
    }

    showMealVouchersInput() {
        return this.state.mealVouchers.length < MAX_SUPPORTED_VALUES;
    }

    renderMealVouchersInput() {
        const placeholder = this.state.mealVouchers.length
            ? translate('settings.anotherMealTicketValuePlaceholder')
            : translate('settings.mealTicketValuePlaceholder');
        return (
            <TextInput
                style={styles.newVoucherValue}
                onSubmitEditing={this.onValueConfirmed}
                onChangeText={this.onValueChange}
                value={this.state.text}
                keyboardType="number-pad"
                returnKeyType="done"
                placeholder={placeholder}
                autoFocus={this.props.showWelcomeScreen}
            />
        );
    }

    onStrategyChange(newValue) {
        this.setState({
            strategyWeights: newValue
        });
    }

    render() {
        const {
            mealVouchers,
            strategyWeights
        } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.header}>{translate('settings.mealVouchersHeader')}</Text>
                    <Text style={styles.description}>{translate('settings.mealVouchersHelp')}</Text>
                    <View style={styles.section}>
                        {
                            mealVouchers.map(item => (
                                <MealVoucherItem
                                    key={item.key}
                                    item={item}
                                    onDelete={this.onDelete}
                                />
                            ))
                        }
                        {
                            this.showMealVouchersInput()
                                ? this.renderMealVouchersInput()
                                : null
                        }
                    </View>
                    <Text style={styles.header}>{translate('settings.resultsSortingHeader')}</Text>
                    <View style={styles.section}>
                        <ResultsSortingSettings
                            strategyWeights={strategyWeights}
                            onValueChange={this.onStrategyChange}
                        />
                    </View>
                    <Text style={styles.header}>{translate('settings.creditsLabel')}</Text>
                    <View style={styles.section}>
                        <Text style={styles.creditsItem}>{translate('settings.creditsContent')}</Text>
                        <Text style={styles.creditsItem}>{translate('settings.creditsAcknowledgement')}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export class SettingsScreenConsumer extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: translate('settings.title'),
            headerRight: (
                <Button
                    onPress={() => navigation.getParam('onSaveHandler')()}
                    title={translate('settings.saveButtonTitle')}
                />
            )
        };
    };

    constructor() {
        super();
        this.state = {
            triggerSave: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onSaveHandler: this.onSave
        });
        this.setState({
            triggerSave: false
        });
    }

    onSave = () => {
        this.setState({
            triggerSave: true
        });
    };

    render() {
        return (
            <SettingsContext.Consumer>
                {({ settings, setSettings, setShowWelcomeScreen, showWelcomeScreen }) => (
                    <SettingsScreen
                        {...this.props}
                        mealVouchers={settings.mealVouchers}
                        strategyWeights={settings.strategyWeights}
                        setSettings={setSettings}
                        showWelcomeScreen={showWelcomeScreen}
                        setShowWelcomeScreen={setShowWelcomeScreen}
                        triggerSave={this.state.triggerSave}
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
        alignItems: 'stretch',
        backgroundColor: '#F9FAFB'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30,
        color: '#778491',
        textAlign: 'center'
    },
    description: {
        color: '#94a1ad',
        marginBottom: 10,
        textAlign: 'center'
    },
    section: {
        marginTop: 40,
        marginRight: 70,
        marginLeft: 70,
        marginBottom: 60
    },
    newVoucherValue: {
        height: 50,
        textAlign: 'right',
        fontSize: 35,
        borderBottomWidth: 2,
        borderBottomColor: '#c9d5e0',
        color: '#94a1ad',
        paddingRight: 40
    },
    creditsItem: {
        color: '#94a1ad',
        marginBottom: 10,
        textAlign: 'center'
    }
});

