import React from 'react';

export const SettingsContext = React.createContext({
    showWelcomeScreen: false,
    settings: {
        mealVouchers: []
    },
    setShowWelcomeScreen: (newValue = true) => { this.showWelcomeScreen = newValue; },
    setSettings: (newSettings) => { this.settings = newSettings; }
});
