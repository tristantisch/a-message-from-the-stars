import type { Map } from "./types";

const specialUpperCaseMappings: Map<string> = {
    'ß': 'ß',
}

export function upperCase(string: string) {
    // For each special character, store all occurences of that character in the string
    const specialCharactersPositions: Map<number[]> = {};
    Object.keys(specialUpperCaseMappings)
        .forEach(
            (specialCharacter) => specialCharactersPositions[specialCharacter] = [...string.matchAll(new RegExp(specialCharacter, 'g'))]
                .map((match) => match.index)
        );
    // Replace all occurences of special characters with a character that will not be transformed and is not present in the input string (hopefully)
    Object.keys(specialUpperCaseMappings).forEach((specialCharacter) => string = string.replace(new RegExp(specialCharacter, 'g'), '*'));
    string = string.toUpperCase();
    // Replace all (originally) special characters with their special uppercase
    Object.keys(specialCharactersPositions)
        .forEach((specialCharacter) => {
            specialCharactersPositions[specialCharacter].forEach(
                (specialCharacterPosition) => string = setCharAt(string, specialCharacterPosition, specialUpperCaseMappings[specialCharacter])
            );
        });

    return string;
}

function setCharAt(string: string, index: number, character: string) {
    return string.substring(0, index) + character + string.substring(index+1);
}