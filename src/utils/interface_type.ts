import { ErrorToggleCodeEnum } from "./constants";

export interface ISnackbar {
    timeout?: number,
    msg: string,
    open: boolean,
    actionName?: string,
    actionCallback?: Function,
}

export interface IToggleError {
    code: ErrorToggleCodeEnum,
    title: string,
    msg: string
}

export interface IInfoModal {
    open: boolean,
    title: string,
    msg: string,
    icon?: string
}
