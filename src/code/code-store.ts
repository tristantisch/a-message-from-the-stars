import { defineStore, storeToRefs } from "pinia";
import { generateCode } from "./code-generator";
import { ref, type Ref } from "vue";
import type { Letter } from "../types";
import { useLanguageStore } from "../language/languageStore";
import { letterPool } from "./letters";

export const useCodeStore = defineStore('code', () => {
    const {language} = storeToRefs(useLanguageStore());
    const code: Ref<Letter[]> = ref(generateCode(language.value));

    const updateCode = (character: string, position: number) => {
        const newLetter = letterPool[language.value].find((letter) => letter.character === character);
        if (newLetter && position >= 0 && position < code.value.length) {
            code.value[position] = newLetter;
        }
    }

    const regenerateCode = () => {
        code.value = generateCode(language.value);
    }

    return { code, updateCode, regenerateCode };
});