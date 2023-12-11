import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { AnyProps, ChildrenProp } from 'src/types/common';
import { RenderOne } from '../utils/Render';

enum SubmitState {
    Idle = 0,
    Running = 1,
    Completed = 2
}

type StatedSubmitButtonProps = {
    state: SubmitState,
    buttonProps: AnyProps,
    runningProps: AnyProps,
    runningChildren: ChildrenProp,
    endedProps: AnyProps,
    endedChildren: ChildrenProp,
    children: ChildrenProp,
}

const StatedSubmitButton = (props: StatedSubmitButtonProps) => {
    const { state } = props

    return (<>
        <RenderOne>
            <RenderOne.Render condition={(state === SubmitState.Idle)}>
                <Button type='submit' {...props.buttonProps}>{props.children}</Button>
            </RenderOne.Render>
            <RenderOne.Render condition={(state === SubmitState.Running)}>
                <Button {...{ ...props.buttonProps, ...props.runningProps }} disabled>{props.runningChildren}</Button>
            </RenderOne.Render>
            <RenderOne.Render condition={(state === SubmitState.Completed)}>
                <Button {...{ ...props.buttonProps, ...props.endedProps }} disabled>{props.endedChildren}</Button>
            </RenderOne.Render>
        </RenderOne>
    </>)
}
StatedSubmitButton.defaultProps = {
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

export { StatedSubmitButton }