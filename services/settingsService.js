import StorageService from './storageService';

const SETTINGS_DATA_KEY = 'settings';
const WELCOME_SHOWN_DATA_KEY = 'welcome_shown';

async function loadSettings() {
    const serializedSettings = await StorageService.loadData(SETTINGS_DATA_KEY);
    return JSON.parse(serializedSettings);
}

async function saveSettings(settings) {
    const serializedSettings = JSON.stringify(settings);
    return StorageService.saveData(SETTINGS_DATA_KEY, serializedSettings);
}

async function showWelcomeScreen() {
    const serializedValue = await StorageService.loadData(WELCOME_SHOWN_DATA_KEY);
    return !JSON.parse(serializedValue);
}

async function toggleWelcomeScreenShown(welcomeShown) {
    const serializedValue = JSON.stringify(welcomeShown);
    return StorageService.saveData(WELCOME_SHOWN_DATA_KEY, serializedValue);
}

export default {
    loadSettings,
    saveSettings,
    showWelcomeScreen,
    toggleWelcomeScreenShown
};
