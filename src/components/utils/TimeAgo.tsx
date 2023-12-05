import ReactTimeAgo from "react-time-ago"

type TimeAgoProps = {
    date: number
}

const TimeAgo = (props: TimeAgoProps) => {
    return(
        <ReactTimeAgo date={props.date}/>
    )
}

export {TimeAgo}