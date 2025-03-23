export enum LetterNotetakingState {
    None = 0,
    Crossed,
    Circled,
}

export function nextState(state: LetterNotetakingState): LetterNotetakingState {
    let numberOfEnumValues = Object.keys(LetterNotetakingState).length / 2;
    return (state + 1) % numberOfEnumValues;
}