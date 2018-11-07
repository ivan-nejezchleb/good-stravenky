import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/MainScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const WelcomeStack = createStackNavigator({
    Welcome: WelcomeScreen
});

WelcomeStack.navigationOptions = {
    tabBarLabel: 'Welcome',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    )
};

const MainStack = createStackNavigator({
    Main: MainScreen
});

MainStack.navigationOptions = {
    tabBarLabel: 'Main',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    )
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    )
};

export default createBottomTabNavigator({
    WelcomeStack,
    MainStack,
    SettingsStack
});
