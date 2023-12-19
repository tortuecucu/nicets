export type StringMap = {
    [k: string] : any
}

export type AnyProps = StringMap

export type ChildrenProp = React.ReactElement

export type CallbackProp = (...args: any[]) => void

export type PromiseProvider = () => Promise<any>

export type ToBeDefined = any

