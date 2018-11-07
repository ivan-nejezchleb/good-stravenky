import {
    Localization
} from 'expo-localization';
import i18n from 'i18n-js';

const en = {
    welcome: {
        title: 'Welcome'
    },
    links: {
        title: 'Links'
    }
};
const cs = {
    welcome: {
        title: 'Vitejte'
    },
    links: {
        title: 'Linky'
    }
};

i18n.fallbacks = true;
i18n.translations = {
    en,
    cs
};
i18n.locale = Localization.locale;


export function t(key) {
    return i18n.t(key);
}
