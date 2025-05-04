<script setup lang="ts">
import { computed } from 'vue';
import LetterComponent from '../letter/LetterComponent.vue';
import { Color } from '../types';
import { codePositions } from './code-generator';
import { useCodeStore } from './code-store';
import { storeToRefs } from 'pinia';

const {index} = defineProps({
    index: {
        type: Number,
        required: true,
    },
});

const codeStore = useCodeStore();
const {code} = storeToRefs(codeStore);
const colorRequirement = computed(() => codePositions[index]);
const letter = computed(() => code.value[index]);

const colorKeys = computed(() => Object.keys(Color).filter(key => isNaN(Number(key))) as (keyof typeof Color)[]);
</script>

<template>
    <div id="codeSlot">
        <div id="colorIndicators">
            <div
                v-for="(colorKey, index) in colorKeys"
                :key="colorKey"
                id="colorIndicator"
                :class="{
                    [colorKey.toLowerCase()]: true,
                    filled: colorRequirement.includes(Color[colorKey]),
                    first: index === 0,
                }"
            ></div>
        </div>
        <LetterComponent 
            :letter="letter"
            isCode
            @update:letter="codeStore.updateCode($event, index)"
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
    --color-size: calc((90px - 4px) / 3);
    width: var(--color-size);
    height: var(--color-size);
    border-style: solid;
    border-color: var(--text);
    border-width: 0px 1px 1px 1px;

    &.first {
        border-width: 1px 1px 1px 1px;
    }

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
