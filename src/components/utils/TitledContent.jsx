import PropTypes from 'prop-types';

const TitledContent = (props) => {
    const TitleTag = `h${props.level}`;
    return(
        <div className={props.divClass}>
            <TitleTag className={props.titleClass}>{props.title}</TitleTag>
            {(props.lead) && <p className={props.leadClass}>{props.lead}</p>}
            {props.children}
        </div>
    )
}
TitledContent.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    lead: PropTypes.string,
    divClass: PropTypes.string,
    leadClass: PropTypes.string,
    titleClass: PropTypes.string,
    level: PropTypes.number
}
TitledContent.defaultProps = {
    title: undefined,
    titleClass: 'mb-2',
    lead: undefined,
    leadClass: 'lead',
    divClass : '',
    level: 4
}

export {TitledContent}