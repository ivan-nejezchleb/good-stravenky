import React from 'react';
import { TextInput, FlatList, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';

import { v4 as uuid } from 'uuid';

import { translate } from '../services/translationsService';
import SettingsService from '../services/settingsService';
import {
    SettingsContext
} from '../context/settingsContext';

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
    static navigationOptions = {
        title: translate('settings.title')
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            mealVouchers: []
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onValueConfirmed = this.onValueConfirmed.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    async componentDidMount() {
        console.log('SettingsScreen mounted');
        const settings = await SettingsService.loadSettings();
        if (settings) {
            this.setState({
                mealVouchers: settings.mealVouchers
            });
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

    async onSave(setSettings, setShowWelcomeScreen) {
        const { mealVouchers } = this.state;
        const { navigate } = this.props.navigation;
        await SettingsService.saveSettings({ mealVouchers });
        await SettingsService.toggleShowWelcomeScreen(false);
        // context sync
        setSettings({ mealVouchers });
        setShowWelcomeScreen(false);

        navigate('Main');
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
        return (
            <SettingsContext.Consumer>
                {({ mealVouchers, setSettings, setShowWelcomeScreen }) => (
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
                        <Button onPress={() => this.onSave(setSettings, setShowWelcomeScreen)} title={translate('settings.saveButtonTitle')} />
                    </KeyboardAvoidingView>
                )}
            </SettingsContext.Consumer>
        );
  }
}

