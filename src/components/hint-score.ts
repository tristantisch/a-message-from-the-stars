import type { Letter } from "../services/types";

export function calculateScore(hint: string, code: Array<Letter>) {
    console.log(hint);
    let score = 0;
    console.log(score);
    score += countMatches(code.slice(0, 3), hint)
    score *= Math.pow(2, countMatches(code.slice(3, 5), hint))
    score *= (countMatches(code.slice(5), hint) > 0) ? -1 : 1;

    return score;
}

function countMatches(letters: Array<Letter>, hint: string) {
    return letters
        .map(letter => letter.character)
        .map(character => (hint.match(new RegExp(character, "g")) || []).length)
        .reduce((partialSum, numMatches) => partialSum + numMatches, 0);
}