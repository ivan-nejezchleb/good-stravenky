import {
    AsyncStorage
} from "react-native"

async function saveData(key, value) {
    return await AsyncStorage.setItem(key, value);
}

async function loadData(key) {
    return await AsyncStorage.getItem(key);
}

export default {
    saveData,
    loadData
}
