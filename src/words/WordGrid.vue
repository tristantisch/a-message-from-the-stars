<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWordsStore } from './wordsStore';

const wordsStore = useWordsStore();
wordsStore.generateRandomWordGrid();
wordsStore.generateRandomIndices();
const { wordGrid, randomWordIndices } = storeToRefs(wordsStore);


const isWordSelected = (index: number) => {
    if (randomWordIndices.value === null) {
        return false;
    }
    const rowNumber = Math.floor(index / 6);
    return randomWordIndices.value[rowNumber] === index % 6;
};
</script>

<template>
    <div id="grid">
        <div
            id="word"
            v-for="(word, index) in (wordGrid as string[][]).flat()"
            :class="{
                selected: isWordSelected(index)
            }"
        >
            {{ word }}
        </div>
    </div>
</template>

<style scoped lang="scss">
#grid {
    display: grid;
    grid-template-columns: repeat(6, max-content);
    grid-template-rows: repeat(3, 1fr);
    column-gap: 1rem;
    justify-content: center;
}
#word {
    justify-self: start;
    font-size: 18px;

    &.selected {
        color: var(--background);
        background-color: var(--text);
        font-weight: bold;
    }
}
</style>