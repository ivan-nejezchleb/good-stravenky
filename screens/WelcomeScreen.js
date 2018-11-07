import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import {
  translate
} from '../services/translationsService';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>{translate('welcome.title')}</Text>
        <Button onPress={() => navigate('Settings')} title={translate('welcome.cfgButtonTitle')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f0f',
  },
});
