import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


const LinkMail = (props) => {
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
LinkMail.propTypes = {
    email: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
}
LinkMail.defaultProps = {
    email: undefined,
    subject: undefined,
    body: undefined
}

export { LinkMail }