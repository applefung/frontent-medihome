import i18n from 'i18next';
import { initReactI18next } from "react-i18next";


i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        resources: {
            en: {
                translation: require('./lang/en').default
            },
            cn: {
                translation: require('./lang/cn').default
            }
        }
    });

export default i18n;