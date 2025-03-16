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