<script setup lang="ts">
import { nextTick, ref, useTemplateRef, type PropType } from 'vue';
import { type Letter } from '../types';
import { LetterNotetakingState, nextState } from './letter-notetaking';
import { upperCase } from '../utils';
import { letterPool } from '../code/code-generator';

const {letter, allowNotetaking, isCode} = defineProps({
    letter : {
        type: Object as PropType<Letter>,
        required: true,
    },
    allowNotetaking: {
        type: Boolean,
        required: false,
        default: false,
    },
    isCode : {
        type: Boolean,
        required: false,
        default: false,
    },
});
const emit = defineEmits(['update:letter']);

const onClick = () => {
    if (allowNotetaking) {
        changeNotetakingState();
    }
    if (isCode) {
        toggleEditMode();
    }
}

let state = ref(LetterNotetakingState.None);
const changeNotetakingState = () => {
    state.value = nextState(state.value);
}

let isInEditMode = ref(false);
const inputField = useTemplateRef('inputField');
const toggleEditMode = async () => {
    isInEditMode.value = !isInEditMode.value;
    if (isInEditMode.value) {
        // Wait for the input field to be rendered
        await nextTick();
        inputField.value?.focus();
    } else {
        if (editedCode.value === '') {
            return;
        } 
        emit('update:letter', editedCode.value);
        editedCode.value = '';
    }
};

const editedCode = ref('');
const updateEditedCode = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let newCode = upperCase(target.value);
    if (newCode.length === 0) {
        editedCode.value = '';
        return;
    }
    if (newCode.length > 1) {
        newCode = newCode[newCode.length - 1];
    }
    if (!letterPool.map(letter => letter.character).includes(newCode)) {
        // Reset the input field to the last valid value
        target.value = editedCode.value;
        return;
    }
    editedCode.value = newCode;
};
</script>

<template>
    <div 
        id="letter"
        :class="{
            [letter.color]: true,
            isCode,
            unselectable: true,
        }"
        @click="onClick()"
    >
        <template v-if="isInEditMode">
            <input
                id="inputField"
                ref="inputField"
                type="text"
                :value="editedCode"
                @input="updateEditedCode"
                @blur="toggleEditMode"
            />
        </template>
        <template v-else>
            <div id="circle" v-if="state === LetterNotetakingState.Circled"></div>
            <div id="cross" v-if="state === LetterNotetakingState.Crossed"></div>
            {{ letter.character }}
        </template> 
    </div>  
</template>

<!-- TODO: Define color constants somwhere central -->
<style scoped>
#letter {
    height: var(--letter-size);
    width: var(--letter-size);

    font-size: 24pt;
    align-content: center;
    position: relative;

    border: 1px solid white;
    &.grey {
        background-color: grey;
    }
    &.green {
        background-color: green;
    }
    &.red {
        background-color: red;
    }
    &.isCode {
        height: var(--letter-size-code);
        width: var(--letter-size-code);
        font-size: 30pt;
    }
}
#circle {
    --circle-size: calc(0.7 * var(--letter-size));
    --border-size: 2px;
    height: var(--circle-size);
    width: var(--circle-size);
    border: var(--border-size) solid white;
    border-radius: calc(var(--circle-size) / 2 + var(--border-size));
    position: absolute;
    top: calc((var(--letter-size) - var(--circle-size)) / 2 - var(--border-size));
    left: calc((var(--letter-size) - var(--circle-size)) / 2 - var(--border-size));
}

#cross {
    position: absolute;
    top: 0;
    left: 0;
    height: var(--letter-size);
    width: var(--letter-size);
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#cross::before,
#cross::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px; /* cross thickness */
    background-color: white;
}
#cross::before {
    transform: rotate(45deg);
}
#cross::after {
    transform: rotate(-45deg);
}

#inputField {
    background: none;
    border: none;
    font-size: 30pt;
    width: var(--letter-size);
    height: var(--letter-size);
    text-align: center;
}
</style>
