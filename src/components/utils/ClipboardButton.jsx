import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ClipboardButton = (props) => {
    const {dataFunc, ...buttonProps} = props
    const handleClick = () => {
        navigator.clipboard.writeText(dataFunc())
    }
    return(<Button onClick={handleClick} {...buttonProps}>{props.children}</Button>)
}
ClipboardButton.propTypes = {
    dataFunc: PropTypes.func
}

export {ClipboardButton}