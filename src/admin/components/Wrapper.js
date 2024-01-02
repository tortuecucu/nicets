const Wrapper = ({children, id, label, text, layout, className}) => {
    return(
        <DefaultLayout children={children} id={id} label={label} text={text} className={className} />
    )
}

const DefaultLayout = ({id, label, text, layout, className, children}) => {
    return(
        <div className={className}>
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            {children}
            {text && <>
                <div className="form-text mb-3">{text}</div>
            </>}
        </div>
    )
}

const WrappedInput = ({ id, label, text, layout, className, inputProps}) => {
    return(
        <Wrapper id={id} label={label} text={text} layout={layout} className={className} >
            <input id={id} className="form-control" {...inputProps} />
        </Wrapper>
    )
}


export {Wrapper, WrappedInput}