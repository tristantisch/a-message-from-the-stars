<script setup lang="ts">
import { computed, ref } from 'vue';
import { calculateScore } from './hint-score'; 
import { type Letter } from '../types';
import { upperCase } from '../utils';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
    messages: {
        en: {
            'hint-placeholder': 'Enter a hint',
        },
        de: {
            'hint-placeholder': 'Gib einen Tipp ein',
        },
        sv: {
            'hint-placeholder': 'Skriv ett tips',
        },
    },
});

const {code} = defineProps({
    code : {
        type: Array<Letter>,
        required: true,
    },
});

let hint = ref('');
const score = computed(() => calculateScore(hint.value, code));
</script>

<template>
    <div id="hint-bar">
        <input 
            type="text"
            :placeholder="t('hint-placeholder')"
            :value="hint"
            @input="event => hint = upperCase((event.target as HTMLTextAreaElement).value)"
        >
        <div id="score">
            {{ score }}
        </div>
    </div>
</template>

<style scoped lang="scss">
#hint-bar {
    align-items: center;
    justify-content: center;
    display: flex;
    padding-bottom: 20px;
}
#score {
    height: 50px;
    width: 50px;
    align-content: center;
    font-size: 18pt;
}
input {
    height: 30px;
    width: 400px;
    font-size: 20pt;
    padding: 10px;
    border: none;
    background-color: var(--color-gray-100);
    color: var(--text);
}
input::placeholder {
    color: var(--color-gray-500);
}
</style>