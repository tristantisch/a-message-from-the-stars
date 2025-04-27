import languages from './language/languages';

export interface Letter {
    character: string,
    color: Color,
};

export interface Map<T> {
    [key: string]: T
}

export enum Color {
    Green = 'green',
    Grey = 'grey',
    Red = 'red',
};

export interface Language {
    isoCode: string,
    flagEmoji: string,
};

export type LanguageCode = typeof languages[number]['isoCode'];