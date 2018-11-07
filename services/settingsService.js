import StorageService from './storageService';

const SETTINGS_DATA_KEY = 'settings';
const WELCOME_SHOWN_DATA_KEY = 'welcome_shown';

async function loadSettings() {
    const serializedSettings = await StorageService.loadData(SETTINGS_DATA_KEY);
    return JSON.parse(serializedSettings);
}

async function saveSettings(settings) {
    const serializedSettings = JSON.stringify(settings);
    await StorageService.saveData(SETTINGS_DATA_KEY, serializedSettings);
}

async function showWelcomeScreen() {
    return !StorageService.loadData(WELCOME_SHOWN_DATA_KEY);
}

async function toggleWelcomeScreenShown(welcomeShown) {
    await StorageService.saveData(WELCOME_SHOWN_DATA_KEY, welcomeShown);
}

export default {
    loadSettings,
    saveSettings,
    showWelcomeScreen,
    toggleWelcomeScreenShown
};
