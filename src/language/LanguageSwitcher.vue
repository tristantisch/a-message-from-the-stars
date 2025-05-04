<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLanguageStore } from './languageStore';
import { useCodeStore } from '../code/code-store';
import type { LanguageCode } from '../types';
import { useWordsStore } from '../words/wordsStore';
import { default as languages } from './languages';

const languageStore = useLanguageStore();
const { language } = storeToRefs(languageStore);
const codeStore = useCodeStore();
const wordsStore = useWordsStore();
const changeLanguage = async (event: Event) => {
    const newLanguage = (event.target as HTMLSelectElement).value as LanguageCode;
    if (language.value === newLanguage) {
        return;
    }

    languageStore.setLanguage(newLanguage);
    codeStore.regenerateCode();
    wordsStore.generateRandomWordGrid();
    wordsStore.generateRandomIndices();
};
</script>

<template>
    <div id="language-switcher">
        <select 
            @change="changeLanguage"
            :value="language"
        >
            <option
                v-for="lang in languages"
                :key="lang.isoCode"
                :value="lang.isoCode"
            >
                {{ lang.flagEmoji }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
#language-switcher {
    position: fixed;
    top: 20px;
    right: 20px;
    margin-bottom: 20px;
    z-index: 100;

    select {
        color: var(--text);
        background-color: var(--color-gray-100);
        font-size: 24px;
        text-align: center;
        padding: 0px;
        border: 1px solid var(--text);
        cursor: pointer;
        outline: none;
        width: 50px;
        height: 50px;
        appearance: none;
    
    }

}
</style>