import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { LanguageCode } from "../types";
import { useI18n } from "vue-i18n";

export const useLanguageStore = defineStore('language', () => {
    const {locale: i18nLocale} = useI18n();
    const language: Ref<LanguageCode> = ref('en');

    const initializeLanguage = () => {
        const storedLanguage: LanguageCode|null = localStorage.getItem('language') as LanguageCode|null;
        setLanguage(storedLanguage || 'en');
    };

    const setLanguage = (newLanguage: LanguageCode) => {
        language.value = newLanguage;
        i18nLocale.value = newLanguage;
        localStorage.setItem('language', newLanguage);
    };

    return { language, initializeLanguage, setLanguage };
});