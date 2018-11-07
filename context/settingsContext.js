export const SettingsContext = React.createContext({
    welcomeShown: false,
    setWelcomeShown: () => { this.welcomeShown = true },
    settings: {
        nominalValues: []
    },
    setSettings: (newSettings) => { this.settings = newSettings }
});
