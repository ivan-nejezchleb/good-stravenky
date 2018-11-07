import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import { MainScreenConsumer } from '../screens/MainScreen';
import { SettingsScreenConsumer } from '../screens/SettingsScreen';
import { SettingsContext } from '../context/settingsContext';

const RootStackNavigatorWrap = ({ routingOptions }) => {
    const RootStackNavigator = createStackNavigator({
        Welcome: {
            screen: WelcomeScreen
        },
        Main: {
            screen: MainScreenConsumer
        },
        Settings: {
            screen: SettingsScreenConsumer
        }
    }, {
        initialRouteName: routingOptions.showWelcomeScreen ? 'Welcome' : 'Main'
    });
    return <RootStackNavigator />;
};

export default class RootNavigator extends React.Component {
    render() {
        return (
            <SettingsContext.Consumer>
                {({ showWelcomeScreen }) => (
                    <RootStackNavigatorWrap routingOptions={({ showWelcomeScreen })} />
                )}
            </SettingsContext.Consumer>
        );
    }
}
