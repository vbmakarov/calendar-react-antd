export const saveDataMemory = (name:string, data:any) => localStorage.setItem(name, JSON.stringify(data))

export const getDataMemory = (name:string) => JSON.parse(localStorage.getItem(name) as string)

export const cleanDataMemory = (name:string) => localStorage.removeItem(name)