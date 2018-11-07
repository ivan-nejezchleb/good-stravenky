export const SettingsContext = React.createContext({
    welcomeShown: false,
    setWelcomeShown: (newValue = true) => { this.welcomeShown = newValue },
    settings: {
        nominalValues: []
    },
    setSettings: (newSettings) => { this.settings = newSettings }
});
