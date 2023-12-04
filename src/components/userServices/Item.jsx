import { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowDown, Trash3, BellFill, BellSlash } from 'react-bootstrap-icons';


const Subscription = ({subscription, notify, onMove, onDelete, onNotify, moveable = true}) => {
    const moveCallback = (id, up) => {
        onMove(id, up);
    }
    const deleteCallback = () => {
        onDelete(subscription);
    }
    const notifyCallback = (id, notify) => {
        onNotify(id, notify);
    }
    return (
        <>
            <li className="list-group-item" id={subscription.id} key={subscription.service.id}>
                <div className="d-flex">
                    {moveable && <>
                        <div className="">
                            <MoveAction up={true} callback={moveCallback} id={subscription.service.id} />
                            <MoveAction up={false} callback={moveCallback} id={subscription.service.id} />
                        </div>
                    </>}
                    <div className="flex-grow-1 pt-1"><span className='name ms-2 fw-medium mt-4'>{subscription.service.name}</span></div>
                    <div className="col-2"><NotifyAction callback={notifyCallback} id={subscription.service.id} active={notify} /></div>
                    {moveable && <div className=""><DeleteAction callback={deleteCallback} id={subscription.service.id} /></div>}
                </div>
            </li>
        </>
    )
};

const MoveAction = ({ up, callback, id }) => {
    const innerCallback = () => {
        callback(id, up);
    }
    return (
        <>
            {up ? (
                <BaseAction icon={<ArrowUp color='#424242' />} callback={innerCallback} id={id} className={'p-0 border-0'} />
            ) : (
                <BaseAction icon={<ArrowDown color='#424242' />} callback={innerCallback} id={id} className={'p-0 border-0'} />
            )}
        </>
    )
}

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

const DeleteAction = ({ id, callback }) => {
    const [confirm, setConfirm] = useState(false);
    const wrapperRef = useRef(null);

    const confirmCallback = () => {
        setConfirm(true);
    }
    const cancelCallback = () => {
        setConfirm(false);
    }
    const deleteCallback = () => {
        callback(id);
    }
    useOutsideAlerter(wrapperRef, cancelCallback);
    return (
        <>
            {confirm ? (
                <div className='d-inline' ref={wrapperRef}>
                    <span>Supprimer? </span>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-danger btn-sm" onClick={deleteCallback}>Oui</button>
                        <button type="button" className="btn btn-success btn-sm" onClick={cancelCallback}>Non</button>
                    </div>
                </div>
            ) : (
                <BaseAction icon={<Trash3 color='#dc3545' />} callback={confirmCallback} id={id} />
            )}
        </>
    )
}

const NotifyAction = ({ active, callback, id }) => {
    const [notify, setNotify] = useState(active);
    const innerCallback = () => {
        setNotify(!notify);
        callback(id, !notify);
    }
    return (
        <>
            <div className='d-inline'>
                {notify ? (
                    <BaseAction icon={<BellFill color='#198754' />} callback={innerCallback} id={id}>
                        <span className="ps-2 fw-light text-secondary">notifié</span>
                    </BaseAction>
                ) : (
                    <BaseAction icon={<BellSlash color='#dc3545' />} callback={innerCallback} id={id}>
                        <span className="ps-2 fw-light text-secondary">non notifié</span>
                    </BaseAction>
                )}
            </div>
        </>
    )
}

const BaseAction = ({ children, icon, callback, id, className }) => {
    const innerCallback = () => {
        callback(id);
    }
    return (
        <>
            <button className={`btn btn-sm ${className}`} onClick={innerCallback}>{icon}{children}</button>
        </>
    )
}

export default Subscription;