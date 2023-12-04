import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from "prop-types"

const StatedSubmit = (props) => {
    const {state} = props

    return(<>
        {state===0 && <Button type='submit' {...props.buttonProps}>{props.children}</Button>}
        {state===1 && <Button {...{...props.buttonProps, ...props.runningProps}} disabled>{props.runningChildren}</Button>}
        {state===2 && <Button {...{...props.buttonProps, ...props.endedProps}} disabled>{props.endedChildren}</Button>}
    </>)    
}
StatedSubmit.propTypes = {
    state: PropTypes.number,
    buttonProps: PropTypes.object,
    runningProps : PropTypes.object,
    runningChildren: PropTypes.element,
    endedProps: PropTypes.object,
    endedChildren: PropTypes.element
}
StatedSubmit.defaultProps = {
    buttonProps: {
        size: 'lg',
        variant: 'primary'
    },
    runningProps: {},
    runningChildren: <><Spinner></Spinner> Chargement...</>,
    endedProps: {
        variant: 'success'
    },
    endedChildren: <>Terminé !</>
}

export {StatedSubmit}