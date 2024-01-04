import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { DataManager } from './DataPuller';
import { useState } from 'react';

interface DataPullButtonProps {
    promise: () => Promise<any>,
    spinner?: JSX.Element,
    errorLabel?: string,
    failLabel?: string,
    successLabel?: string,
    successElement?: JSX.Element,
    successCallback?: () => void,
    children: React.JSX.Element
}

interface BtnProps {
    onClick?: () => void,
    spinner?: JSX.Element,
    children?: React.JSX.Element
}

const DataPullButton = (props: DataPullButtonProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const Btn = (props: BtnProps ) => {
        return (
            <Button onClick={props.onClick} {...props}>
                {isSubmitted && props.spinner}
                {props.children}
            </Button>
        )
    }

    const handleSubmit = (): void => {
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
            <DataManager promise={props.promise} show={isSubmitted} loadingElement={<Btn />} errorElement={ErrorButton} fallback={FailButton}>
                {(props.successElement) ?
                    props.successElement
                    :
                    <Button onClick={handleSuccess} variant='success' {...props}>{props.successLabel}</Button>
                }
            </DataManager>
        </>

    )
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