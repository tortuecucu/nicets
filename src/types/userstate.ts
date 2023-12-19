export type Choice = {
    name: string,
    title: string,
    text: string,
    button: {
        label: string,
        color: string
    }
}

export type StateCaptions = {
    name: string,
    id: number,
    title: string,
    choices: Choice[]
}

export enum Verb {
    Undefined = 0,
    Affected= 1,
    Workaround= 2,
    Nominal=3
}

export type UserState = {
    outageId: number,
    verb: Verb,
    feedback: string
}