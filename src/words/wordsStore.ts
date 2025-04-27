import { defineStore, storeToRefs } from "pinia";
import { useLanguageStore } from "../language/languageStore";
import { ref, type Ref } from "vue";
import { default as words } from './words.json';

export const useWordsStore = defineStore('words', () => {
    const {language} = storeToRefs(useLanguageStore());
    const wordGrid: Ref<string[][]|null> = ref(null);
    const randomWordIndices: Ref<number[]|null> = ref(null);

    const generateRandomWordGrid = () => {
        const shuffledWords = (words[language.value] as string[][]).sort(() => Math.random() - 0.5);
        wordGrid.value = shuffledWords.slice(0, 3);
    };
    
    const generateRandomIndices = () => {
        randomWordIndices.value = Array(3).fill(0).map(() => Math.floor(Math.random() * 6));
    };


    return { wordGrid, randomWordIndices, generateRandomWordGrid, generateRandomIndices };
});