import React from 'react';

export const SettingsContext = React.createContext({
    showWelcomeScreen: false,
    setShowWelcomeScreen: (newValue = true) => { this.showWelcomeScreen = newValue; },
    settings: {
        mealVouchers: []
    },
    setSettings: (newSettings) => { this.settings = newSettings; }
});
