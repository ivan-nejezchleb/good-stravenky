import React from 'react';
import {
  TextInput,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Button
} from 'react-native';

import {
  v4 as uuid
} from 'uuid';

import {
  translate
} from '../services/translationsService';
import SettingsService from '../services/settingsService';

import {
  MealVoucherItem
} from '../components/MealVoucherItem';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: translate('settings.title'),
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
    const settings = await SettingsService.loadSettings();
    if (settings) {
      this.setState({
        mealVouchers: settings.mealVouchers
      })
    }
  }

  onValueChange(value) {
    this.setState({
      text: value
    })
  }
  onValueConfirmed() {
    const { text } = this.state;
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
    await SettingsService.toggleWelcomeScreenShown(true);
  }

  showMealVouchersInput() {
    return this.state.mealVouchers.length < 4
  }

  onDelete(keyToDelete) {
    this.setState({
      mealVouchers: this.state.mealVouchers.filter(({key}) => key !== keyToDelete)
    });
  }

  renderMealVouchersInput() {
    return (
      <TextInput style = {
            {
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              textAlign: 'right'
            }
          }
          onSubmitEditing = {
            this.onValueConfirmed
          }
          onChangeText = {
            this.onValueChange
          }
          value = {
            this.state.text
          }

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
          data = { mealVouchers }
          renderItem = {
              ({ item }) =>
                <MealVoucherItem item={item} onDelete={this.onDelete}/>
          }
        />
        {
          this.showMealVouchersInput() ?
          this.renderMealVouchersInput() :
          null
        }
        <Button onPress={this.onSave} title={translate('settings.saveButtonTitle')}/>
      </KeyboardAvoidingView>
    );
  }
}
