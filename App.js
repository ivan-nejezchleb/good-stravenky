import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { ErrorBoundary } from './components/ErrorComponent';
import SettingsService from './services/settingsService';
import { SettingsContext } from './context/settingsContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.setShowWelcomeScreen = this.setShowWelcomeScreen.bind(this);
        this.setSettings = this.setSettings.bind(this);
        this.state = {
            isLoadingComplete: false,
            settingsContext: {
                showWelcomeScreen: true,
                settings: {
                    mealVouchers: []
                },
                setShowWelcomeScreen: this.setShowWelcomeScreen,
                setSettings: this.setSettings
            },
            settingsLoaded: false
        };
    }

    async componentDidMount() {
        const showWelcomeScreen = await SettingsService.showWelcomeScreen();
        const settings = await SettingsService.loadSettings();
        console.log(settings);
        this.setState({
            settingsContext: {
                ...this.state.settingsContext,
                showWelcomeScreen,
                settings: {
                    ...this.state.settingsContext.settings,
                    ...settings
                }
            },
            settingsLoaded: true
        }, console.log(this.state.settingsContext));
    }

    setSettings(newSettings) {
        this.setState({
            settingsContext: {
                ...this.state.settingsContext,
                settings: newSettings
            }
        });
    }

    setShowWelcomeScreen(newValue = true) {
        this.setState({
            settingsContext: {
                ...this.state.settingsContext,
                showWelcomeScreen: newValue
            }
        });
    }

    loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png')
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
            })
        ]);
    };

    handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

    render() {
        const { isLoadingComplete, settingsLoaded } = this.state;
        if (!isLoadingComplete && !settingsLoaded && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this.loadResourcesAsync}
                    onError={this.handleLoadingError}
                    onFinish={this.handleFinishLoading}
                />
            );
        }
        return (
            <ErrorBoundary>
                <SettingsContext.Provider value={this.state.settingsContext}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <AppNavigator />
                    </View>
                </SettingsContext.Provider>
            </ErrorBoundary>
        );
    }
}
