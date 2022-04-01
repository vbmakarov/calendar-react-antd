export interface TaskTypes{
    type: string,
    dt:string | number,
    date:string,
    time: string,
    content: string
}

export interface Tasks {
    visible:boolean,
    tasks:TaskTypes[],
    date: string
}

export interface TasksModal {
    isVisibleTasks: Tasks,
    setVisible: (state:Tasks) => void
}

export interface IDeleteNotes {
    user: string,
    date: string,
    correctTasks: {
        [key:string]: [value:string]
    }

}