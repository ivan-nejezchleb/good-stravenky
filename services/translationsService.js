import {
    Localization
} from 'expo-localization';
import i18n from 'i18n-js';
import * as en from '../translations/en.json';
import * as cs from '../translations/cs.json';
import * as sk from '../translations/sk.json';

i18n.fallbacks = true;
i18n.translations = {
    en,
    cs,
    sk
};
i18n.locale = Localization.locale;

export function translate(key) {
    return i18n.t(key);
}
