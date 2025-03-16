import { Color, type Letter } from "./types";

export const letterPool: Array<Letter> = [
    { character: "A", color: Color.Green },
    { character: "B", color: Color.Grey },
    { character: "C", color: Color.Grey },
    { character: "D", color: Color.Grey },
    { character: "E", color: Color.Green },
    { character: "F", color: Color.Grey },
    { character: "G", color: Color.Grey },
    { character: "H", color: Color.Green },
    { character: "I", color: Color.Green },
    // { character: "J", color: Color.Red },
    // { character: "K", color: Color.Grey },
    // { character: "L", color: Color.Grey },
    // { character: "M", color: Color.Grey },
    // { character: "N", color: Color.Green },
    // { character: "O", color: Color.Grey },
    // { character: "P", color: Color.Red },
    // { character: "Q", color: Color.Red },
    // { character: "R", color: Color.Green },
    // { character: "S", color: Color.Green },
    // { character: "T", color: Color.Green },
    // { character: "U", color: Color.Grey },
    // { character: "V", color: Color.Red },
    // { character: "W", color: Color.Grey },
    // { character: "X", color: Color.Red },
    // { character: "Y", color: Color.Red },
    // { character: "Z", color: Color.Grey },
    { character: "ß", color: Color.Red },
    // { character: "Ä", color: Color.Red },
    // { character: "Ö", color: Color.Red },
    // { character: "Ü", color: Color.Red },
];

export const codePositions: Array<Array<Color>> = [
    [Color.Green],
    [Color.Grey, Color.Red],
    [Color.Grey, Color.Red],
    [Color.Green],
    [Color.Grey, Color.Red],
    [Color.Green, Color.Grey, Color.Red],
];

export function generateCode(): Array<Letter> {
    let code: Array<Letter> = Array(codePositions.length).fill(null);

    let possibleIndices: Array<number> = Array.from(Array(letterPool.length).keys());
    for (let i = 0; i < codePositions.length; i++) {
        while (code.filter(code => code !== null).length === i) {
            const randomIndex = getAndRemoveRandomElement(possibleIndices);
            const randomLetter = letterPool[randomIndex];
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