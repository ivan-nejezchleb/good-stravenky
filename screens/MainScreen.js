import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import SettingsService from '../services/settingsService';
import { calculateResults } from '../services/calculationService';

import {
  MealVoucherItem
} from '../components/MealVoucherItem';

import {
  CalculationResultsList
} from '../components/CalculationResultsList';


export default class MainScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      calcualtionResults: [],
      mealVouchers: [],
      calculating: false
    };

    this.setResult = this.setResult.bind(this);

    this.onValueChange = this.onValueChange.bind(this);
    this.onValueConfirmed = this.onValueConfirmed.bind(this);
    // this.onSave = this.onSave.bind(this);
    // this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    console.log('MainScreen mounted');
    const settings = await SettingsService.loadSettings();
    if (settings) {
      this.setState({
        mealVouchers: settings.mealVouchers
      })
    }
  }

  onValueChange(value) {
    console.log(value);
    this.setState({
      value
    })
  }

  setResult(calcualtionResults) {
    this.setState({
      calculating: false,
      calcualtionResults
    });
  }

  onValueConfirmed() {
    const {
      value,
      mealVouchers
    } = this.state;
    console.log('onValueConfirmed');
    this.setState({
      calculating: true
    }, () =>{
      const calcualtionResults = calculateResults(value, mealVouchers);
      setTimeout(() => {
        this.setResult(calcualtionResults);
      }, 3000);
    });
  }

  renderResultsList() {
    const {
      calcualtionResults
    } = this.state;
    return (<CalculationResultsList items={calcualtionResults} />);
  }

  renderResults() {
    const {
      calculating
    } = this.state;
    console.log(calculating);
    if (calculating) {
      return (<Text>Kalkulujuuuuu</Text>);
    }
    return this.renderResultsList();
  }

  render() {
    const {value, mealVouchers} = this.state;
    console.log(value);
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput style={styles.valueInput}
          onSubmitEditing={this.onValueConfirmed}
          onChangeText={this.onValueChange}
          value={value}
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <FlatList
          data = { mealVouchers }
          renderItem = {
              ({ item }) =>
                <MealVoucherItem item={item}/>
          }
        />
        {this.renderResults()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 120
  },
  valueInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'right'
  }
});
