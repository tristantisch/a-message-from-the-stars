<script setup lang="ts">
import { getRandomWordGrid, getRandomWordIndices } from './words';

const words = getRandomWordGrid();
const indices = getRandomWordIndices();

const isWordSelected = (index: number) => {
    const rowNumber = Math.floor(index / 6);
    console.log(rowNumber, index, indices);
    return indices[rowNumber] === index % 6;
};
</script>

<template>
    <div id="grid">
        <div
            id="word"
            v-for="(word, index) in words.flat()"
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
        background-color: #f0f0f0;
        color: #000;
        font-weight: bold;
    }
}
</style>