import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import MainScreen from '../screens/MainScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { SettingsContext } from '../context/settingsContext';

const RootStackNavigatorWrap = ({ routingOptions }) => {
    const RootStackNavigator = createStackNavigator({
        Welcome: {
            screen: WelcomeScreen
        },
        Main: {
            screen: MainScreen
        },
        Settings: {
            screen: SettingsScreen
        }
    }, {
        initialRouteName: routingOptions.showWelcomeScreen ? 'Welcome' : 'Settings'
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
