import useDate from "src/hooks/backend/useDate"

type FormattedDateProps = {
    date: string | number | Date
    format: string
}

const FormattedDate = (props: FormattedDateProps) => {
    const {format, ago} = useDate()
    return (<>
        <span className="formatted-date">
            <span className="fw-medium">{format(props.date, props.format)}</span>
            <span className="ago ms-1 text-secondary">{ago(props.date)}</span>
        </span>
    </>)
}
FormattedDate.defaultProps = {
    format: 'DD/MM/YYYY'
}

export { FormattedDate }