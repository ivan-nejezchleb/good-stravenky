import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, FlatList, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';

import { v4 as uuid } from 'uuid';

import { translate } from '../services/translationsService';
import SettingsService from '../services/settingsService';
import { SettingsContext } from '../context/settingsContext';

import { MealVoucherItem } from '../components/MealVoucherItem';
import Utils from '../utils/utils';

const MAX_SUPPORTED_VALUES = 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    valueInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'right'
    }
});

export default class SettingsScreen extends React.Component {

    static propTypes = {
        mealVouchers: PropTypes.array.isRequired
    };

    static defaultProps = {
        setSettings: () => {},
        setShowWelcomeScreen: () => {},
        triggerSave: false
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            mealVouchers: [...this.props.mealVouchers]
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onValueConfirmed = this.onValueConfirmed.bind(this);
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
        const { mealVouchers } = this.state;
        await SettingsService.saveSettings({ mealVouchers });
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
        return (
            <TextInput
                style={styles.valueInput}
                onSubmitEditing={this.onValueConfirmed}
                onChangeText={this.onValueChange}
                value={this.state.text}
                keyboardType="number-pad"
                returnKeyType="done"
            />
        );
    }

    render() {
        const { mealVouchers } = this.state;
        return (
            <KeyboardAvoidingView>
                <FlatList
                    data={mealVouchers}
                    renderItem={
                        ({ item }) =>
                            <MealVoucherItem item={item} onDelete={this.onDelete} />
                    }
                />
                {
                    this.showMealVouchersInput() ?
                        this.renderMealVouchersInput() :
                        null
                }
                <Button onPress={() => this.onReset()} title="Reset Welcome" />
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
                        setSettings={setSettings}
                        setShowWelcomeScreen={setShowWelcomeScreen}
                        triggerSave={this.state.triggerSave}
                    />
                )}
            </SettingsContext.Consumer>
        );
    }
}

