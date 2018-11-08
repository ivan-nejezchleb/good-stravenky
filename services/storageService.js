import {
    AsyncStorage
} from 'react-native';

async function saveData(key, value) {
    return AsyncStorage.setItem(key, value);
}

async function loadData(key) {
    // await AsyncStorage.clear();
    return AsyncStorage.getItem(key);
}

export default {
    saveData,
    loadData
};
