<script setup lang="ts">
import { computed } from 'vue';
import LetterComponent from './LetterComponent.vue';
import { Color } from '../services/types';
import { codePositions } from '../services/code-generator';
import { useCodeStore } from '../services/code-store';

const {index} = defineProps({
    index: {
        type: Number,
        required: true,
    },
});

const {code, updateCode} = useCodeStore();
const colorRequirement = computed(() => codePositions[index]);
const letter = computed(() => code[index]);

const colorKeys = computed(() => Object.keys(Color).filter(key => isNaN(Number(key))) as (keyof typeof Color)[]);
</script>

<template>
    <div id="codeSlot">
        <div id="colorIndicators">
            <div
                v-for="colorKey in colorKeys"
                :key="colorKey"
                id="colorIndicator"
                :class="{
                    [colorKey.toLowerCase()]: true,
                    filled: colorRequirement.includes(Color[colorKey]),
                }"
            ></div>
        </div>
        <LetterComponent 
            :letter="letter"
            isCode
            @update:letter="updateCode($event, index)"
        />
    </div>      
</template>

<style scoped lang="scss">
#codeSlot {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
#colorIndicators {
    display: flex;
    flex-direction: column;
}
#colorIndicator {
    width: 28px;
    height: 28px;
    border: solid 1px white;

    &.filled {
        &.grey {
            background-color: grey;
        }
        &.green {
            background-color: green;
        }
        &.red {
            background-color: red;
        }
    }
}
</style>
