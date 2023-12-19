import ReactTimeAgo from "react-time-ago"
import dayjs from "dayjs"

type TimeAgoProps = {
    date: number | string
}

const TimeAgo = (props: TimeAgoProps) => {
    return(
        <ReactTimeAgo date={dayjs(props.date).toDate()}/>
    )
}

export {TimeAgo}