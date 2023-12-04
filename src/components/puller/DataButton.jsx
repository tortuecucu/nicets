import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { DataManager } from './DataPuller';
import PropTypes from "prop-types"
import { useState } from 'react';

const DataPullButton = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const Btn = ({ onClick }) => {
        return (
            <Button onClick={onClick} {...props}>
                {isSubmitted && props.spinner}
                {props.children}
            </Button>
        )
    }

    const handleSubmit = () => {
        setIsSubmitted(true)
    }

    const handleReset = () => {
        setIsSubmitted(false)
    }

    const handleSuccess = () => {
        if (props.successCallback) {
            props.successCallback()
        } else {
            handleReset()
        }
    }

    const ErrorButton = <Button onClick={handleReset} variant='danger' {...props}>{props.errorLabel}</Button>
    const FailButton = <Button onClick={handleReset} variant='warning' {...props}>{props.failLabel}</Button>

    return (
        <>
            {!isSubmitted && <Btn onClick={handleSubmit} />}
            <DataManager promise={props.promise} show={isSubmitted} loadingElement={<Btn />} errorElement={<ErrorButton />} fallback={<FailButton />}>
                {(props.successElement) ?
                    props.successElement
                    :
                    <Button onClick={handleSuccess} variant='success' {...props}>{props.successLabel}</Button>
                }
            </DataManager>
        </>

    )
}
DataPullButton.propTypes = {
    children: PropTypes.element,
    promise: PropTypes.func,
    spinner: PropTypes.element,
    errorLabel: PropTypes.string,
    failLabel: PropTypes.string,
    successLabel: PropTypes.string,
    successElement: PropTypes.element,
    successCallback: PropTypes.func
}
DataPullButton.defaultProps = {
    spinner: <Spinner animation='border' role='status' />,
    errorLabel: 'Erreur !',
    failLabel: 'Echec !',
    successLabel: 'Réussi !',
    successElement: undefined,
    successCallback: undefined
}

export {DataPullButton}