import useDate from "src/hooks/backend/useDate"

type FormattedDateProps = {
    date: string | number | Date
}

const FormattedDate = (props: FormattedDateProps) => {
    const {format} = useDate()
    return (<>
        <span className="formatted-date">
            <span className="fw-medium">{format(props.date, 'LLL')}</span>
            <span className="ago ms-1 text-secondary">(format(props.date))</span>
        </span>
    </>)
}

export { FormattedDate }