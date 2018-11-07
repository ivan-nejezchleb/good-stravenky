import StorageService from './storageService';

const SETTINGS_DATA_KEY = 'settings';
const SHOW_WELCOME_SCREEN_DATA_KEY = 'show_welcome_screen';

async function loadSettings() {
    const serializedSettings = await StorageService.loadData(SETTINGS_DATA_KEY);
    if (serializedSettings === null) {
        return {
            settings: {
                mealVouchers: []
            }
        };
    }
    return JSON.parse(serializedSettings);
}

async function saveSettings(settings) {
    const serializedSettings = JSON.stringify(settings);
    return StorageService.saveData(SETTINGS_DATA_KEY, serializedSettings);
}

async function showWelcomeScreen() {
    const serializedValue = await StorageService.loadData(SHOW_WELCOME_SCREEN_DATA_KEY);
    if (serializedValue === null) {
        return true;
    }
    return JSON.parse(serializedValue);
}

async function toggleShowWelcomeScreen(shouldShowWelcomeScreen) {
    const serializedValue = JSON.stringify(shouldShowWelcomeScreen);
    return StorageService.saveData(SHOW_WELCOME_SCREEN_DATA_KEY, serializedValue);
}

export default {
    loadSettings,
    saveSettings,
    showWelcomeScreen,
    toggleShowWelcomeScreen
};
