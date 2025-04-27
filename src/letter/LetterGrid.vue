<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { letterPool } from '../code/letters';
import LetterComponent from '../letter/LetterComponent.vue';
import { useLanguageStore } from '../language/languageStore';
import { computed } from 'vue';

const {language} = storeToRefs(useLanguageStore());
const letters = computed(() => letterPool[language.value]);
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