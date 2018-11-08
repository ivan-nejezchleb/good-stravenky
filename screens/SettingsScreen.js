import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, FlatList, KeyboardAvoidingView, Button, StyleSheet, View, Text } from 'react-native';

import { v4 as uuid } from 'uuid';

import { translate } from '../services/translationsService';
import SettingsService from '../services/settingsService';
import { SettingsContext } from '../context/settingsContext';

import { MealVoucherItem } from '../components/MealVoucherItem';
import { StrategySlider } from '../components/StrategySlider';
import Utils from '../utils/utils';

const MAX_SUPPORTED_VALUES = 2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    headerContainer: {
        textAlign: 'center'
    },
    bottomContainer: {
        backgroundColor: '#fff'
    },
    valueInput: {
        height: 50,
        textAlign: 'right',
        fontSize: 40,
        borderWidth: 0,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 30,
        color: '#778491'
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 130,
        color: '#778491',
        textAlign: 'center'
    },
});

export default class SettingsScreen extends React.Component {

    static propTypes = {
        mealVouchers: PropTypes.array,
        strategyWeights: PropTypes.object
    };

    static defaultProps = {
        triggerSave: false,
        mealVouchers: [],
        setSettings: ()=>{},
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

    onValueConfirmed() {
        const { text } = this.state;

        if (!Utils.isValidMealVoucherValue(text)) {
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
        this.props.setSettings({ mealVouchers });
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
        const placeholder = this.state.mealVouchers.length ? translate('settings.nextMealTicketValuePlaceholder') : translate('settings.mealTicketValuePlaceholder');
        return (
            <TextInput
                style={styles.valueInput}
                onSubmitEditing={this.onValueConfirmed}
                onChangeText={this.onValueChange}
                value={this.state.text}
                keyboardType="number-pad"
                returnKeyType="done"
                placeholder={placeholder}
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
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <View styel={styles.headerContainer}>
                        <Text style={styles.header}>{translate('settings.mealVouchersHeader')}</Text>
                    </View>
                    <View style={styles.list}>
                        <FlatList
                            data={mealVouchers}
                            renderItem={
                                ({ item }) =>
                                <MealVoucherItem item={item} onDelete={this.onDelete} />
                            }
                            />
                    </View>
                    {
                        this.showMealVouchersInput() ?
                        this.renderMealVouchersInput() :
                        null
                    }
                    <StrategySlider strategyWeights={strategyWeights} onValueChange={this.onStrategyChange} />
                </View>
            </KeyboardAvoidingView>
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
                {({ settings, setSettings, setShowWelcomeScreen }) => (
                    <SettingsScreen
                        {...this.props}
                        mealVouchers={settings.mealVouchers}
                        strategyWeights={settings.strategyWeights}
                        setSettings={setSettings}
                        setShowWelcomeScreen={setShowWelcomeScreen}
                        triggerSave={this.state.triggerSave}
                    />
                )}
            </SettingsContext.Consumer>
        );
    }
}

