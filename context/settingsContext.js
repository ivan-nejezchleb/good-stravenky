import React from 'react';

export const SettingsContext = React.createContext({
    showWelcomeScreen: true,
    settings: {
        mealVouchers: []
    },
    setShowWelcomeScreen: (newValue = true) => { this.showWelcomeScreen = newValue; },
    setSettings: (newSettings) => { this.settings = newSettings; }
});
