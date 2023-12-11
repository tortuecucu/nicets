import { Button } from 'react-bootstrap';

type ClipboardButtonProps = {
    dataFunc: () => string,
    [k: string]: any
}

const ClipboardButton = (props: ClipboardButtonProps) => {
    const {dataFunc, ...buttonProps} = props
    const handleClick = () => {
        navigator.clipboard.writeText(dataFunc())
    }
    return(<Button onClick={handleClick} {...buttonProps}>{props.children}</Button>)
}

export {ClipboardButton}