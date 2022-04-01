export interface INotes {
    [user:string]: {
        [date:string]: {
            [time:string]: string
        }
    }
}