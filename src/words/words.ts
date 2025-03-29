import { default as words } from './words.json';

export const getRandomWordGrid = () => {
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, 3);
};

export const getRandomWordIndices = () => {
    return Array(3).fill(0).map(() => Math.floor(Math.random() * 6));
};