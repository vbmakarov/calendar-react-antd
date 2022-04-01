export interface VisibleData {
    modal:boolean,
    success: boolean
}

export interface IModal {
    isVisible: VisibleData,
    setVisible: (state:VisibleData) => void
}
