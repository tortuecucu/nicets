import useDate from "src/hooks/backend/useDate"

type TimeAgoProps = {
    date: number | string
}

const TimeAgo = (props: TimeAgoProps) => {
    const { ago } = useDate()
    return(
        <span>{ago(props.date)}</span>
    )
}

export {TimeAgo}