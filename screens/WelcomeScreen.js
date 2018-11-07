import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import {
    translate
} from '../services/translationsService';

const styles = StyleSheet.create({
    header: {
        fontWeight: '800',
        paddingTop: 40
    },
    container: {
        flex: 1,
        paddingTop: 15
    }
});

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
      header: null
  };

  render() {
      const { navigate } = this.props.navigation;
      return (
          <View style={styles.container}>
              <Text>{translate('welcome.title')}</Text>
              <Button onPress={() => navigate('Settings')} title={translate('welcome.cfgButtonTitle')} />
          </View>
      );
  }
}
