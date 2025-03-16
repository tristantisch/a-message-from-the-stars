<script setup lang="ts">
import { ref } from 'vue';
import CodeSlot from './components/CodeSlot.vue';
import LetterGrid from './components/LetterGrid.vue';
import HintBar from './components/HintBar.vue';
import { generateCode } from './services/code-generator';
import { codePositions as colorRequirements } from './services/code-generator';

const code = ref(generateCode());
</script>

<template>
  <div id="letterGrids">
    <LetterGrid>
      <div id="codeSlots">
        <CodeSlot
            v-for="(letter, index) in code.slice(0, 3)"
            :letter="letter"
            :colorRequirement="colorRequirements[index]"
        />
      </div>
    </LetterGrid>
    <LetterGrid>
      <div id="codeSlots">
        <CodeSlot
            v-for="(letter, index) in code.slice(3, 5)"
            :letter="letter"
            :colorRequirement="colorRequirements[index]"
        />
      </div>
    </LetterGrid>
    <LetterGrid>
      <div id="codeSlots">
        <CodeSlot
            v-for="(letter, index) in code.slice(5)"
            :letter="letter"
            :colorRequirement="colorRequirements[index]"
        />
      </div>
    </LetterGrid>
  </div>
  <HintBar :code="code"/>
</template>

<style scoped>
#codeSlots {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
#letterGrids {
  display: flex;
}
</style>
