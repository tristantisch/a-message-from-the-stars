import { Color, type Letter } from "../types";
import { letterPool } from "./letters";

export const codePositions: Array<Array<Color>> = [
    [Color.Green],
    [Color.Grey, Color.Red],
    [Color.Grey, Color.Red],
    [Color.Green],
    [Color.Grey, Color.Red],
    [Color.Green, Color.Grey, Color.Red],
];

export function generateCode(language: string): Letter[] {
    let code: Array<Letter> = Array(codePositions.length).fill(null);

    let possibleIndices: Array<number> = Array.from(Array(letterPool[language].length).keys());
    for (let i = 0; i < codePositions.length; i++) {
        while (code.filter(code => code !== null).length === i) {
            const randomIndex = getAndRemoveRandomElement(possibleIndices);
            const randomLetter = letterPool[language][randomIndex];
            const codePosition = getCodePositionOfLetter(code, randomLetter);
            if (codePosition >= 0) {
                code[codePosition] = randomLetter;
            }
        }
    }

    return code;
}

function getAndRemoveRandomElement<T>(array: Array<T>): T {
    return array.splice(
        Math.random() * array.length,
        1,
    )[0];
}

function getCodePositionOfLetter(code: Array<Letter>, letter: Letter): number {
    if (letter.color === Color.Red && code.some((letter) => letter?.color === Color.Red)) {
        // Only one red letter is allowed in the code. If there already is one, early return.
        return -1;
    }

    let position = -1;
    for (let i = 0; i < code.length; i++) {
        if (code[i] === null && codePositions[i].includes(letter.color)) {
            // If the position is allowed to hold the color of the letter and is empty,
            // we have found suitable position.
            position = i;
            break;
        }
    }

    return position;
}