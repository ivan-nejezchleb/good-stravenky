import React from 'react';
import {
  TextInput,
  Text,
  FlatList
} from 'react-native';

import {
  translate
} from '../services/translationsService';

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
          key: text,
          value: text
        }
      ]
    });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    const { mealVouchers } = this.state;
    return (
      <React.Fragment>
        <FlatList
          data = { mealVouchers }
          renderItem = {
              ({ item }) =>
                <Text>
                  { item.value }
                </Text>}
        />
        <TextInput style = {
            {
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
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
      </React.Fragment>
    );
  }
}
