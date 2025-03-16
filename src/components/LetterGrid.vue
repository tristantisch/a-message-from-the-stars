<script setup lang="ts">
import { letterPool } from '../services/code-generator';
import LetterComponent from './LetterComponent.vue';

const letters = letterPool;
</script>

<template>
    <div id="grid-wrapper">
        <slot></slot>
        <div id="grid">
            <LetterComponent
                v-for="letter in letters"
                :letter="letter"
                :allowNotetaking="true"
            />
        </div>
    </div>  
</template>

<style scoped lang="scss">
#grid-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#grid {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(5, max-content);
}
</style>