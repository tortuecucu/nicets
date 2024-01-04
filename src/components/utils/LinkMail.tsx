import { Button } from 'react-bootstrap';

interface LinkMailProps {
    email: string,
    subject?: string,
    body?: string,
    [x: string]: any
}

const LinkMail = (props: LinkMailProps) => {
    const href = () => {
        let params = props.subject || props.body ? '?' : '';
        if (props.subject) params += `subject=${encodeURIComponent(props.subject)}`;
        if (props.body) params += `${props.subject ? '&' : ''}body=${encodeURIComponent(props.body)}`;
        return `mailto:${props.email}${params}`;
    }
    return(
        <Button href={href()} {...props}>{props.children}</Button>
    )
}
LinkMail.defaultProps = {
    email: undefined,
    subject: undefined,
    body: undefined
}

export { LinkMail }