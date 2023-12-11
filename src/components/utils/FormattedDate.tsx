import dayjs from "dayjs"

//TODO: finalize it

type FormattedDateProps = {
    date: string | number | Date

}

const FormattedDate = (props: FormattedDateProps) => {
    const djs = dayjs(props.date)
    return (<>
        <span className="formatted-date">
            <span className="fw-medium">{djs.format('LLL')}</span>
            <span className="ago ms-1 text-secondary">({djs.format('LLL')})</span>
        </span>
    </>)
}

export { FormattedDate }