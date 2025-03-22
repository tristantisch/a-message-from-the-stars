import { defineStore } from "pinia";
import { generateCode, letterPool } from "./code-generator";
import { ref, type Ref } from "vue";
import type { Letter } from "./types";

export const useCodeStore = defineStore('code', () => {
    const code: Ref<Letter[]> = ref(generateCode());

    const updateCode = (character: string, position: number) => {
        const newLetter = letterPool.find((letter) => letter.character === character);
        if (newLetter && position >= 0 && position < code.value.length) {
            code.value[position] = newLetter;
        }
    }

    return { code, updateCode };
});